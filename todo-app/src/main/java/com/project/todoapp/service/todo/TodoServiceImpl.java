package com.project.todoapp.service.todo;

import com.project.todoapp.dto.CreateTodo;
import com.project.todoapp.dto.TodoResource;
import com.project.todoapp.dto.UpdateTodo;
import com.project.todoapp.dto.event.TodoDeleted;
import com.project.todoapp.dto.event.TodoSavedUpdated;
import com.project.todoapp.entity.Todo;
import com.project.todoapp.enums.NotificationEventTopic;
import com.project.todoapp.exception.ConcurrentModificationException;
import com.project.todoapp.exception.TodoItemNotFoundException;
import com.project.todoapp.repository.TodoRepository;
import com.project.todoapp.service.notification.NotificationService;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * implementation to TodoService.
 */
@Slf4j
@Data
@Service
public class TodoServiceImpl implements TodoService {

  private final TodoRepository todoRepository;
  private final NotificationService notificationService;

  @Override
  public Mono<TodoResource> createNewTodo(final CreateTodo createTodo) {
    return todoRepository.save(
            new Todo(createTodo.title(), createTodo.description(), Todo.TodoStatus.TODO))
        .map(this::convertToDto);
  }

  @Override
  public Mono<TodoResource> getTodoItemById(final String todoId) {
    return todoRepository.findById(UUID.fromString(todoId)).map(this::convertToDto);
  }

  @Override
  public Flux<TodoResource> getAllTodos() {
    return todoRepository.findAll().map(this::convertToDto).delayElements(Duration.ofMillis(50));
  }

  @Override
  public Mono<TodoResource> updateTodoItem(final String uuid, final UpdateTodo updateTodo,
                                           final long version) {
    return findById(uuid, version)
        .switchIfEmpty(Mono.error(
            new TodoItemNotFoundException(String.format("Unable to find todo with id: %s", uuid))))
        .flatMap(todo -> {
          todo.setTitle(updateTodo.title());
          todo.setDescription(updateTodo.description());
          todo.setStatus(updateTodo.todoStatus());
          todo.setUpdatedAt(OffsetDateTime.now());
          return todoRepository.save(todo);
        }).map(this::convertToDto);
  }

  @Override
  public Mono<Void> deleteTodoItem(final String uuid, final long version) {
    return findById(uuid, version)
        .switchIfEmpty(Mono.error(
            new TodoItemNotFoundException(String.format("Unable to find todo with id: %s", uuid))))
        .flatMap(todoRepository::delete);
  }

  @Override
  public Flux<TodoSavedUpdated> listenSaveAndUpdateEvents() {
    return notificationService.listen(NotificationEventTopic.TODO_SAVED, Todo.class)
        .map(item -> convertToDto((Todo) item))
        .map(item -> new TodoSavedUpdated((TodoResource) item));
  }

  @Override
  public Flux<TodoDeleted> listenDeletedTodos() {
    return notificationService.listen(NotificationEventTopic.TODO_DELETED, Todo.class)
        .map(item -> ((Todo) item).getTodoId().toString())
        .map(item -> new TodoDeleted(item.toString()));
  }

  private TodoResource convertToDto(final Todo todo) {
    return TodoResource.builder()
        .id(todo.getTodoId())
        .version(todo.getVersion())
        .title(todo.getTitle())
        .description(todo.getDescription())
        .status(todo.getStatus())
        .createdAt(todo.getCreatedAt())
        .updatedAt(todo.getUpdatedAt())
        .build();
  }

  private Mono<Todo> findById(final String uuid, final long version) {
    return todoRepository.findById(UUID.fromString(uuid))
        .switchIfEmpty(Mono.error(
            new TodoItemNotFoundException(String.format("Unable to find todo with id: %s", uuid))))
        .handle((item, sink) -> {
          if (!item.getVersion().equals(version)) {
            sink.error(new ConcurrentModificationException(
                String.format("concurrent modification of todo with id: [%s]", uuid)));
          } else {
            sink.next(item);
          }
        });
  }
}
