package com.project.todoapp.dto;

import com.project.todoapp.entity.Todo;
import lombok.Data;

/**
 * data class to update an existing to-do item.
 */
public record UpdateTodo(String description, Todo.TodoStatus todoStatus) {
}
