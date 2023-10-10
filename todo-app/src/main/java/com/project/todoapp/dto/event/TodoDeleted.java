package com.project.todoapp.dto.event;

import lombok.Builder;

@Builder
public record TodoDeleted(String todoId) implements Events {
}
