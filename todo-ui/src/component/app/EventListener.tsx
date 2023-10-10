/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description component to listen to to-do items updates.
 */

import React, { useEffect } from 'react';

import { LISTEN_TO_TODO_EVENTS_ENDPOINT } from '../../config/application-config';
import { TodoResource } from '../../client/api';
import { Columns } from '../../typing/app';
import { mapTodoStatusToColumnKey } from '../../util/util';

type EVENT_TYPE = 'TODO_UPDATE' | 'TODO_DELETE';

interface IProps {
	removeTodoFromColumn: (todoId: string, columnId: keyof Columns) => void;
	handleTodoFieldsUpdate: (todo: TodoResource) => void;
}

const EventListener: React.FC<IProps> = ({ removeTodoFromColumn, handleTodoFieldsUpdate }) => {
	const handleUpdate = (todo: TodoResource) => {
		// handleTodoFieldsUpdate(todo);
		console.log(todo);
	};

	const handleDelete = (todo: TodoResource) => {
		// removeTodoFromColumn(todo.id, mapTodoStatusToColumnKey(todo.status));
		console.log(todo);
	};

	useEffect(() => {
		const eventSource = new EventSource(LISTEN_TO_TODO_EVENTS_ENDPOINT);

		eventSource.onmessage = (event) => {
			const todoEvent = JSON.parse(event.data);
			const todo: TodoResource = todoEvent.todoResource;
			if (event.type === 'TODO_UPDATE') {
				handleUpdate(todo);
			} else if (event.type === 'TODO_DELETE') {
				handleDelete(todo);
			}
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
