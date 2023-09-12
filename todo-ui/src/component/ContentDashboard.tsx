/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description the content with todo's.
 */

import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Typography, message as antdMessage } from 'antd';

import DynamicTodo from './DynamicTodo';
import TodoCard from './TodoCard';
import useUpdateTodo from '../hooks/useUpdateTodo';
import { Columns, mapColumnKeyToTodoStatus, mapTodoStatusToColumnKey } from '../config/application-config';
import { TodoResource } from '../client/api';

const todoColumns: Columns = {
	todo: {
		title: 'To Do',
		items: [],
	},
	inProgress: {
		title: 'In Progress',
		items: [],
	},
	completed: {
		title: 'Completed',
		items: [],
	},
};

interface IProps {
	refreshCount: number;
}

const ContentDashboard: React.FC<IProps> = ({ refreshCount }) => {
	const [columns, setColumns] = useState<Columns>(todoColumns);
	const updateTodo = useUpdateTodo();

	useEffect(() => {
		_.forEach(todoColumns, (item) => (item.items = []));
		setColumns(todoColumns);
	}, [refreshCount]);

	const addTodoToColumn = (columnId: keyof Columns, todo: any) => {
		setColumns((prevColumns) => {
			const updatedColumns: Columns = { ...prevColumns };
			updatedColumns[columnId].items.push(todo);
			return updatedColumns;
		});
	};

	const handleTodoReceived = (todo: TodoResource) => {
		const columnId = mapTodoStatusToColumnKey(todo.status);
		addTodoToColumn(columnId, todo);
	};

	const handleTodoUpdate = (updatedTodoState: string, todo: TodoResource): boolean => {
		const todoStatus = mapColumnKeyToTodoStatus(updatedTodoState);
		if (todoStatus === undefined) {
			antdMessage.error('Unable to move item');
			return false;
		}

		const updateTodoPayload = {
			title: todo.title,
			description: todo.description,
			todoStatus,
		};
		let response: boolean = true;
		updateTodo.mutate(
			{ uuid: todo.id, updateTodo: updateTodoPayload, version: todo.version },
			{
				onSuccess: () => {
					response = true;
				},
				onError: () => {
					response = false;
				},
			},
		);
		return response;
	};

	const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
		if (!result.destination) return;

		const { source, destination } = result;
		const sourceColumn = columns[source.droppableId];
		const sourceItems = [...sourceColumn.items];

		const [removed] = sourceItems.splice(source.index, 1);

		if (source.droppableId == destination.droppableId) {
			sourceItems.splice(destination.index, 0, removed);
		} else {
			if (!handleTodoUpdate(destination.droppableId, removed)) {
				return;
			}

			const destColumn = columns[destination.droppableId];
			const destItems = [...destColumn.items];

			destItems.splice(destination.index, 0, removed);

			const updatedColumns = {
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
			};
			setColumns(updatedColumns);
		}
	};

	return (
		<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
			<DynamicTodo onTodoFetch={handleTodoReceived} reloadTodos={refreshCount} />
			<div className='task-container'>
				<div className='task-columns'>
					{_.map(columns, (column: any, columnId: any) => (
						<Droppable key={columnId} droppableId={columnId}>
							{(provided) => (
								<div className='task-list' ref={provided.innerRef} {...provided.droppableProps}>
									<Typography.Title>{column?.title}</Typography.Title>
									{_.map(column.items, (item, index: number) => (
										<TodoCard key={item.id} todoResource={item} index={index} />
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
				</div>
			</div>
		</DragDropContext>
	);
};

export default ContentDashboard;
