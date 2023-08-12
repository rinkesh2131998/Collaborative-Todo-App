package com.project.todoapp.exception;

/**
 * data class to throw exception if unable to find a to-do item resource.
 */
public class TodoItemNotFoundException extends RuntimeException{
  public TodoItemNotFoundException(final String message) {
    super(message);
  }
}
