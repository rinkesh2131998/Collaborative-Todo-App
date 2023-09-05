package com.project.todoapp.service;

import com.project.todoapp.dto.CreateTodo;
import com.project.todoapp.dto.TodoResource;
import com.project.todoapp.dto.UpdateTodo;
import com.project.todoapp.entity.Todo;
import com.project.todoapp.exception.TodoItemNotFoundException;
import com.project.todoapp.repository.TodoRepository;
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
    return todoRepository.findAll().map(this::convertToDto);
  }

  @Override
  public Mono<TodoResource> updateTodoItem(final String uuid, final UpdateTodo updateTodo) {
    return todoRepository.findById(UUID.fromString(uuid))
        .switchIfEmpty(Mono.error(
            new TodoItemNotFoundException(String.format("Unable to find todo with id: %s", uuid))))
        .flatMap(todo -> {
          todo.setDescription(updateTodo.description());
          todo.setStatus(updateTodo.todoStatus());
          todo.setUpdatedAt(OffsetDateTime.now());

          return todoRepository.save(todo);
        }).map(this::convertToDto);
  }

  @Override
  public Mono<Void> deleteTodoItem(final String uuid) {
    return todoRepository.findById(UUID.fromString(uuid))
        .switchIfEmpty(Mono.error(
            new TodoItemNotFoundException(String.format("Unable to find todo with id: %s", uuid))))
        .flatMap(todoRepository::delete);
  }

  private TodoResource convertToDto(final Todo todo) {
    return TodoResource.builder()
        .id(todo.getTodoId())
        .title(todo.getTitle())
        .description(todo.getDescription())
        .status(todo.getStatus())
        .createdAt(todo.getCreatedAt())
        .updatedAt(todo.getUpdatedAt())
        .build();
  }
}
