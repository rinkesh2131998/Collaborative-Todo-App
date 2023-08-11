package com.project.todoapp.repository;

import com.project.todoapp.entity.Todo;
import java.util.UUID;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

/**
 * repository to access to-do table.
 */
@Repository
public interface TodoRepository extends R2dbcRepository<Todo, UUID> {
}
