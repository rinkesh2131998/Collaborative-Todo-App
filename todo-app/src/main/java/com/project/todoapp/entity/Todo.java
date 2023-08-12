package com.project.todoapp.entity;

import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * entity class to define r2dbc table.
 */
@Data
@NoArgsConstructor
@Table(name = "todo")
public class Todo {
  @Id
  private UUID todoId;
  private String description;
  private TodoStatus status;
  private OffsetDateTime createdAt;
  private OffsetDateTime updatedAt;;

  public Todo(final String description, final TodoStatus status) {
    this.todoId = null;
    this.description = description;
    this.status = status;
  }

  public enum TodoStatus {
    TODO, PROGRESS, COMPLETED
  }
}
