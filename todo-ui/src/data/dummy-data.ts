/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description get dummy data for testing, remove later.
 */

import { TodoResource, TodoResourceStatusEnum } from '../client/api';

export const activeTodos: TodoResource[] = [
	{
		id: '1',
		title: 'Todo-Title',
		description: 'Task 1',
		status: TodoResourceStatusEnum.Todo,
		createdAt: '2023-09-06T10:00:00Z',
		updatedAt: '2023-09-06T11:30:00Z',
	},
	{
		id: '2',
		title: 'Todo-Title',
		description: 'Task 2',
		status: TodoResourceStatusEnum.Todo,
		createdAt: '2023-09-06T12:00:00Z',
		updatedAt: '2023-09-06T14:15:00Z',
	},
	{
		id: '3',
		title: 'Todo-Title',
		description: 'Task 3',
		status: TodoResourceStatusEnum.Todo,
		createdAt: '2023-09-06T15:30:00Z',
		updatedAt: '2023-09-06T16:45:00Z',
	},
];

export const inProgressTodos: TodoResource[] = [
	{
		id: '4',
		title: 'Todo-Title',
		description: 'Task 4',
		status: TodoResourceStatusEnum.InProgress,
		createdAt: '2023-09-07T08:00:00Z',
		updatedAt: '2023-09-07T09:45:00Z',
	},
	{
		id: '5',
		title: 'Todo-Title',
		description: 'Task 5',
		status: TodoResourceStatusEnum.InProgress,
		createdAt: '2023-09-07T10:30:00Z',
		updatedAt: '2023-09-07T11:15:00Z',
	},
	{
		id: '6',
		title: 'Todo-Title',
		description: 'Task 6',
		status: TodoResourceStatusEnum.InProgress,
		createdAt: '2023-09-07T12:00:00Z',
		updatedAt: '2023-09-07T13:30:00Z',
	},
];

export const completedTodos: TodoResource[] = [
	{
		id: '7',
		title: 'Todo-Title',
		description: 'Task 7',
		status: TodoResourceStatusEnum.Completed,
		createdAt: '2023-09-07T08:00:00Z',
		updatedAt: '2023-09-07T09:45:00Z',
	},
	{
		id: '8',
		title: 'Todo-Title',
		description: 'Task 8',
		status: TodoResourceStatusEnum.Completed,
		createdAt: '2023-09-07T10:30:00Z',
		updatedAt: '2023-09-07T11:15:00Z',
	},
	{
		id: '9',
		title: 'Todo-Title',
		description: 'Task 9',
		status: TodoResourceStatusEnum.Completed,
		createdAt: '2023-09-07T12:00:00Z',
		updatedAt: '2023-09-07T13:30:00Z',
	},
];

export const todoColumns = {
	todo: {
		title: 'To Do',
		items: activeTodos,
	},
	inProgress: {
		title: 'In Progress',
		items: inProgressTodos,
	},
	completed: {
		title: 'Completed',
		items: completedTodos,
	},
};
