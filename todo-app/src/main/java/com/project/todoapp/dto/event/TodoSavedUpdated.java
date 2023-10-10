package com.project.todoapp.dto.event;

import com.project.todoapp.dto.TodoResource;

public record TodoSavedUpdated(TodoResource todoResource) implements Events {
}
