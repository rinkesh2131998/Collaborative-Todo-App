package com.project.todoapp.controller;

import com.project.todoapp.dto.CreateTodo;
import com.project.todoapp.dto.TodoResource;
import com.project.todoapp.dto.UpdateTodo;
import com.project.todoapp.dto.event.Events;
import com.project.todoapp.dto.event.TodoDeleted;
import com.project.todoapp.dto.event.TodoSavedUpdated;
import com.project.todoapp.service.todo.TodoService;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * endpoints for to-do service.
 */
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/todo")
public class TodoController {
  private final TodoService todoService;

  /**
   * used to create a new to-do
   */
  @PostMapping
  public Mono<TodoResource> createTodo(@RequestBody final CreateTodo payload) {
    return todoService.createNewTodo(payload);
  }

  /**
   * used to fetch all to-do's.
   */
  @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<TodoResource> getAllTodos() {
    return todoService.getAllTodos();
  }

  /**
   * fetch a single to-do item by its id.
   */
  @GetMapping(value = "/{uuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<TodoResource> getTodo(@RequestParam final String uuid) {
    return todoService.getTodoItemById(uuid);
  }

  /**
   * used to update to-do item.
   */
  @PutMapping("/{uuid}")
  public Mono<TodoResource> updateTodo(@PathVariable final String uuid, @RequestBody final
  UpdateTodo payload, @RequestHeader(name = HttpHeaders.IF_MATCH, required = false)
                                       final long version) {
    return todoService.updateTodoItem(uuid, payload, version);
  }

  /**
   * used to delete an existing to do item.
   */
  @DeleteMapping("/{uuid}")
  public Mono<Void> deleteTodo(@RequestParam final String uuid,
                               @RequestHeader(name = HttpHeaders.IF_MATCH, required = false)
                               final long version) {
    return todoService.deleteTodoItem(uuid, version);
  }

  @GetMapping("/events")
  public Flux<ServerSentEvent<Events>> getEvents() {
    final Flux<TodoSavedUpdated> todoSavedUpdatedFlux = todoService.listenSaveAndUpdateEvents();
    final Flux<TodoDeleted> todoDeletedFlux = todoService.listenDeletedTodos();

    return Flux.merge(todoSavedUpdatedFlux, todoDeletedFlux)
        .map(event -> ServerSentEvent.<Events>builder()
            .retry(Duration.ofSeconds(1L))
            .event(event.getClass().getSimpleName())
            .data(event).build()
        );
  }
}
