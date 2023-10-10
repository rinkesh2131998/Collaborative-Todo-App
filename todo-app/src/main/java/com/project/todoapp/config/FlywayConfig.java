package com.project.todoapp.config;

import com.project.todoapp.config.property.DatabaseProperty;
import io.r2dbc.spi.ConnectionFactory;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;
import org.springframework.stereotype.Component;

/**
 * flyway configs.
 */
@Slf4j
@Data
@Component
public class FlywayConfig extends AbstractR2dbcConfiguration implements InitializingBean {
  private final DatabaseProperty databaseProperty;
  private final ConnectionFactory connectionFactory;

  @Override
  public void afterPropertiesSet() throws Exception {
    Flyway.configure()
        .dataSource(databaseProperty.getUrl(), databaseProperty.getUsername(),
            databaseProperty.getPassword())
        .baselineOnMigrate(true)
        .load()
        .migrate();
  }

  @Override
  public ConnectionFactory connectionFactory() {
    return connectionFactory;
  }

}
