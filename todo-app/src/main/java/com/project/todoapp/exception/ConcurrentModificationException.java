package com.project.todoapp.exception;

/**
 * exception in case of concurrent modification of the same resource.
 */
public class ConcurrentModificationException extends RuntimeException {
  public ConcurrentModificationException(final String message) {
    super(message);
  }
}
