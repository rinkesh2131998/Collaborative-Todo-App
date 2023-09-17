/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description general configs for the application.
 */

import { TodoResource, TodoResourceStatusEnum } from '../client/api';

export const BASE_URL: string = 'http://localhost:8089';

export const FETCH_ALL_TODO_SSE_ENDPOINT: string = BASE_URL + '/todo';

export interface Column {
	title: string;
	items: TodoResource[];
}

export interface Columns {
	todo: Column;
	inProgress: Column;
	completed: Column;
}

export enum TodoStatus {
	Todo = 'todo',
	InProgress = 'inProgress',
	Completed = 'completed',
}

// export declare namespace AppNs {
// 	interface IValues {
// 		todoColumns: Columns;
// 	}

// 	interface IActions {
// 		setTodoColumns: (todoColumns: Columns) => { todoColumns: Columns };
// 	}
// }
