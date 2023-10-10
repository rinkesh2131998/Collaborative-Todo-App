package com.project.todoapp.config;

import com.project.todoapp.config.property.DatabaseProperty;
import io.r2dbc.postgresql.PostgresqlConnectionConfiguration;
import io.r2dbc.postgresql.PostgresqlConnectionFactory;
import io.r2dbc.spi.ConnectionFactory;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Slf4j
@Data
@Component
public class PgConnectionFactory {

  private final DatabaseProperty databaseProperty;

  @Bean
  public ConnectionFactory connectionFactory() {
    return new PostgresqlConnectionFactory(
        PostgresqlConnectionConfiguration.builder()
            .host(databaseProperty.getDatabaseHost())
            .port(databaseProperty.getDatabasePort())
            .database(databaseProperty.getDatabaseName())
            .username(databaseProperty.getUsername())
            .password(databaseProperty.getPassword())
            .build()
    );
  }
}
