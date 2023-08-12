package com.project.todoapp.service;

import com.project.todoapp.dto.CreateTodo;
import com.project.todoapp.dto.TodoResource;
import com.project.todoapp.dto.UpdateTodo;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * interface for using to-do repository.
 */
@Service
public interface TodoService {

  /**
   * add new to do item.
   * @param createTodo payload to use for creating new item.
   * @return created to-do item
   */
  Mono<TodoResource> createNewTodo(CreateTodo createTodo);

  /**
   * fetch a single to-do item by its id.
   * @param todoId to fetch
   * @return resource
   */
  Mono<TodoResource> getTodoItemById(String todoId);

  /**
   * fetch all to-do items.
   * @return all to-do type resources.
   */
  Flux<TodoResource> getAllTodos();

  /**
   * used to update an already existing to do item.
   * @param uuid identifier for the to-do to be updated
   * @param updateTodo payload used to update resource
   * @return updated resource
   */
  Mono<TodoResource> updateTodoItem(String uuid, UpdateTodo updateTodo);

  /**
   * used to delete an existing to-do item.
   * @param uuid identifier for the resource to delete
   * @return void
   */
  Mono<Void> deleteTodoItem(String uuid);
}
