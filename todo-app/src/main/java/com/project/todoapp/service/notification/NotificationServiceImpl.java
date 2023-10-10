package com.project.todoapp.service.notification;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.project.todoapp.enums.NotificationEventTopic;
import com.project.todoapp.exception.PostgresNotificationException;
import io.r2dbc.postgresql.api.PostgresqlConnection;
import io.r2dbc.spi.ConnectionFactory;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


/**
 * Implementation for Notification Service.
 */
@Slf4j
@Data
@Service
public class NotificationServiceImpl<T> implements NotificationService<T> {
  private final ConnectionFactory connectionFactory;
  private final ObjectMapper objectMapper = new ObjectMapper()
      .registerModule(new JavaTimeModule())
      .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
  private final Set<NotificationEventTopic> watchedTopics = new HashSet<>();
  private PostgresqlConnection postgresqlConnection;

  @PostConstruct
  void init() {
    postgresqlConnection = Mono.from(connectionFactory.create())
        .cast(PostgresqlConnection.class)
        .block();
  }

  @Override
  public Flux<T> listen(final NotificationEventTopic topic, final Class<T> clazz) {
    log.info("Adding listening on topic: [{}] for postgres events", topic);
    if (!watchedTopics.contains(topic)) {
      synchronized (watchedTopics) {
        if (!watchedTopics.contains(topic)) {
          executeListenEvent(topic);
          watchedTopics.add(topic);
        }
      }
    }
    return postgresqlConnection.getNotifications()
        .filter(notification -> notification.getName().equals(topic.name()) && Objects.nonNull(
            notification.getParameter()))
        .handle((notification, sink) -> {
          try {
            sink.next(objectMapper.readValue(notification.getParameter(), clazz));
          } catch (final Exception exception) {
            final String errorMessage =
                String.format("Unable to listen to topic: %s, cause: %s", topic,
                    exception.getMessage());
            log.error(errorMessage);
            Mono.error(new PostgresNotificationException(errorMessage));
          }
        });
  }

  @Override
  public void unlisten(final NotificationEventTopic topic) {
    log.info("Stopping listening on topic: [{}] for postgres events", topic);
    if (!watchedTopics.contains(topic)) {
      synchronized (watchedTopics) {
        if (!watchedTopics.contains(topic)) {
          executeUnlistenEvent(topic);
          watchedTopics.remove(topic);
        }
      }
    }
  }

  private void executeListenEvent(final NotificationEventTopic eventTopic) {
    postgresqlConnection.createStatement(String.format("LISTEN \"%s\"", eventTopic)).execute()
        .subscribe();
  }

  private void executeUnlistenEvent(final NotificationEventTopic eventTopic) {
    postgresqlConnection.createStatement(String.format("UNLISTEN \"%s\"", eventTopic)).execute()
        .subscribe();
  }

  @PreDestroy
  void close() {
    postgresqlConnection.close().subscribe();
  }
}
