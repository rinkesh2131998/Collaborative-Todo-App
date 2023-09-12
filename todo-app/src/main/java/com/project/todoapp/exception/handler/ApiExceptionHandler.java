package com.project.todoapp.exception.handler;

import com.project.todoapp.dto.ErrorResponse;
import com.project.todoapp.exception.ConcurrentModificationException;
import com.project.todoapp.exception.TodoItemNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * exception handler.
 */
@Slf4j
@ControllerAdvice
public class ApiExceptionHandler {

  /**
   * in case of where the to-do with given id can not be found
   *
   * @param todoItemNotFoundException exception
   * @param request                   api request
   * @return proper response for error
   */
  @ExceptionHandler({TodoItemNotFoundException.class})
  public ResponseEntity<ErrorResponse> handleTodoItemNotFoundException(
      final TodoItemNotFoundException todoItemNotFoundException) {
    return ResponseEntity.badRequest()
        .body(new ErrorResponse(todoItemNotFoundException.getMessage()));
  }

  /**
   * in case of concurrent modification of a resource.
   *
   * @param concurrentModificationException exception
   * @param request                         api request
   * @return proper response for error
   */
  @ExceptionHandler({ConcurrentModificationException.class})
  public ResponseEntity<ErrorResponse> handleConcurrentModificationException(
      final ConcurrentModificationException concurrentModificationException) {
    return new ResponseEntity<ErrorResponse>(
        new ErrorResponse(concurrentModificationException.getMessage()),
        HttpStatus.CONFLICT);
  }
}
