package com.project.todoapp.service.notification;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.project.todoapp.enums.NotificationEventTopic;
import io.r2dbc.spi.ConnectionFactory;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

/**
 * Implementation for Notification Service.
 */
@Slf4j
@Data
@Service
public class NotificationServiceImpl<T> implements NotificationService<T> {
  private final DatabaseClient databaseClient;
  private final ConnectionFactory connectionFactory;
  private final Set<NotificationEventTopic> eventTopicsToWatch = new HashSet<>();
  private final ObjectMapper objectMapper = new ObjectMapper()
      .registerModule(new JavaTimeModule())
      .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

  @Override
  public Flux<T> listen(final NotificationEventTopic topic, final Class<T> clazz) {
    return null;
  }

//  private void listenToNotification(final String topic) {
//
//    final String sqlQuery = "LISTEN :topic";
//    databaseClient.sql(sqlQuery)
//        .bind("topic", topic)
//        .fetch()
//        .rowsUpdated()
//        .
//  }

  private void unlistenToNotification() {

  }

  @Override
  public void unlisten(final NotificationEventTopic topic) {
    log.warn("Implement");
  }

}
