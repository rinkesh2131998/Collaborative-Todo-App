package com.project.todoapp.dto.event;

import com.project.todoapp.dto.TodoResource;
import com.project.todoapp.enums.TodoEventType;
import lombok.Builder;

/**
 * data class to return all events wrt to-do update, insert and delete.
 */
@Builder
public record Event(TodoEventType todoEventType, TodoResource todoResource) {
}
