package com.project.todoapp.exception;

/**
 * exception to be thrown in case of something wrong while listening to postgres events.
 */
public class PostgresNotificationException extends RuntimeException {
  public PostgresNotificationException(final String message) {
    super(message);
  }
}
