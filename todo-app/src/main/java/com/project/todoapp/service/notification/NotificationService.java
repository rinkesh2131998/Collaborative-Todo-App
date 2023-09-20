package com.project.todoapp.service.notification;

import com.project.todoapp.enums.NotificationEventTopic;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

/**
 * service to listen to to-do table save, insert or deletion events.
 */
@Service
public interface NotificationService<T> {

  /**
   * subscribe and start listening on a postgres channel for events.
   *
   * @param topic channel/topic to listen on
   * @param clazz to deserialize to
   * @return events.
   */
  Flux<T> listen(NotificationEventTopic topic, Class<T> clazz);

  /**
   * unsubscribe and stop listening on a postgres channel for events.
   *
   * @param topic channel/topic to stop listening to
   */
  void unlisten(NotificationEventTopic topic);

}
