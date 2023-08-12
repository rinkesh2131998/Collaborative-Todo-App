package com.project.todoapp.dto;

import lombok.Data;

/**
 * data class to request a new to-do item creation.
 */
public record CreateTodo(String description) {
}
