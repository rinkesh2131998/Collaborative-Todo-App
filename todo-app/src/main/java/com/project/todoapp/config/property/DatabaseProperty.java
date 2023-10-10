package com.project.todoapp.config.property;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Getter
public class DatabaseProperty {
  private final String databaseName;
  private final String databaseHost;
  private final int databasePort;
  private final String url;
  private final String username;
  private final String password;

  public DatabaseProperty(
      @Value("${app-config.database-name}") final String databaseName,
      @Value("${app-config.database-host}") final String databaseHost,
      @Value("${app-config.database-port}") final int databasePort,
      @Value("${spring.flyway-custom.url}") final String url,
      @Value("${spring.flyway-custom.username}") final String username,
      @Value("${spring.flyway-custom.password}") final String password) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.databaseName = databaseName;
    this.databaseHost = databaseHost;
    this.databasePort = databasePort;
  }
}
