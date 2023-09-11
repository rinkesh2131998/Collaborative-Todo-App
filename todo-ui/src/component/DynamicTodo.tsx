/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description component to handle fetching todos, dynamically through sse
 */

import React, { useEffect } from 'react';
import { FETCH_ALL_TODO_SSE_ENDPOINT } from '../config/application-config';

interface IProps {
	onTodoFetch: any;
	reloadTodos: number;
}

const DynamicTodo: React.FC<IProps> = ({ onTodoFetch, reloadTodos }) => {
	useEffect(() => {
		const eventSource = new EventSource(FETCH_ALL_TODO_SSE_ENDPOINT);

		eventSource.onmessage = (event) => {
			console.log(event);
			const newTodo = JSON.parse(event.data);
			onTodoFetch(newTodo);
		};

		eventSource.onerror = (error: any) => {
			console.log(error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, [reloadTodos]);

	return <></>;
};

export default DynamicTodo;
