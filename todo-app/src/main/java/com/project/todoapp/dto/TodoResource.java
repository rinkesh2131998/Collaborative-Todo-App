package com.project.todoapp.dto;

import com.project.todoapp.entity.Todo;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;

/**
 * data class to return to-do items.
 */
@Builder
public record TodoResource(UUID todoId, String description, Todo.TodoStatus status, OffsetDateTime createdAt, OffsetDateTime updatedAt) {
}
