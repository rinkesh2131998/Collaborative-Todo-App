package com.project.todoapp.dto;

import com.project.todoapp.entity.Todo;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Builder;

/**
 * data class to return to-do items.
 */
@Builder
public record TodoResource(@NotNull UUID id, @NotNull Long version, @NotNull String title,
                           @NotNull String description,
                           @NotNull Todo.TodoStatus status, @NotNull OffsetDateTime createdAt,
                           @NotNull OffsetDateTime updatedAt) {
}
