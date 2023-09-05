package com.project.todoapp.dto;

import com.project.todoapp.entity.Todo;

/**
 * data class to update an existing to-do item.
 */
public record UpdateTodo(String title, String description, Todo.TodoStatus todoStatus) {
}
