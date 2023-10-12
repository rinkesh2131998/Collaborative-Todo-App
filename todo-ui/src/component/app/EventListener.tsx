/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description component to listen to to-do items updates.
 */

import React, { useEffect } from 'react';

import { LISTEN_TO_TODO_EVENTS_ENDPOINT } from '../../config/application-config';
import { Event, EventTodoEventTypeEnum, TodoResource } from '../../client/api';
import { Columns } from '../../typing/app';
import { mapTodoStatusToColumnKey } from '../../util/util';

type EVENT_TYPE = 'TODO_UPDATE' | 'TODO_DELETE';

interface IProps {
	removeTodoFromColumn: (todoId: string, columnId: keyof Columns) => void;
	handleTodoFieldsUpdate: (todo: TodoResource) => void;
}

const EventListener: React.FC<IProps> = ({ removeTodoFromColumn, handleTodoFieldsUpdate }) => {
	const handleEvents = (event: Event) => {
		if (event.todoResource?.id) {
			if (event.todoEventType === EventTodoEventTypeEnum.TodoDelete) {
				removeTodoFromColumn(event.todoResource?.id, mapTodoStatusToColumnKey(event.todoResource?.status));
			} else if (event.todoEventType === EventTodoEventTypeEnum.TodoUpdate) {
				handleTodoFieldsUpdate(event.todoResource);
			}
		}
	};

	useEffect(() => {
		const eventSource = new EventSource(LISTEN_TO_TODO_EVENTS_ENDPOINT);

		eventSource.onmessage = (event) => {
			const todoEvent: Event = JSON.parse(event.data);
			handleEvents(todoEvent);
		};

		eventSource.onerror = (error: any) => {
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return <></>;
};

export default EventListener;
