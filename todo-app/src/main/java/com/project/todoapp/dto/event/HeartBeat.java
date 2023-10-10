package com.project.todoapp.dto.event;

import java.util.UUID;
import lombok.Data;

@Data
public class HeartBeat {
  private final String beat = UUID.randomUUID().toString();
}
