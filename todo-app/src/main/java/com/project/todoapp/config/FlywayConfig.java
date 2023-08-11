package com.project.todoapp.config;

import io.r2dbc.spi.ConnectionFactory;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;
import org.springframework.stereotype.Component;

/**
 * flyway configs.
 */
@Slf4j
@Component
public class FlywayConfig extends AbstractR2dbcConfiguration implements InitializingBean {
  private final String url;
  private final String username;
  private final String password;
  private final ConnectionFactory connectionFactory;

  public FlywayConfig(
      @Value("${spring.flyway-custom.url}") final String url,
      @Value("${spring.flyway-custom.username}") final String username,
      @Value("${spring.flyway-custom.password}") final String password,
      final ConnectionFactory connectionFactory) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.connectionFactory = connectionFactory;
  }

  @Override
  public void afterPropertiesSet() throws Exception {
    Flyway.configure()
        .dataSource(url, username, password)
        .baselineOnMigrate(true)
        .load()
        .migrate();
  }

  @Override
  public ConnectionFactory connectionFactory() {
    return connectionFactory;
  }

}
