package com.project.todoapp.dto;


import jakarta.validation.constraints.NotNull;

/**
 * data class to request a new to-do item creation.
 */
public record CreateTodo(@NotNull String title, @NotNull String description) {
}
