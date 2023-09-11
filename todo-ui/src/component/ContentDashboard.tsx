/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description the content with todo's.
 */

import React, { useState } from 'react';
import _ from 'lodash';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Typography } from 'antd';

import DynamicTodo from './DynamicTodo';
import TodoCard from './TodoCard';
import { Columns, TodoColumns, mapTodoStatusToColumnKey } from '../config/application-config';
import { TodoResource } from '../client/api';

const ContentDashboard: React.FC = () => {
	const [columns, setColumns] = useState<Columns>(TodoColumns);

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

	const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
		if (!result.destination) return;

		const { source, destination } = result;
		const sourceColumn = columns[source.droppableId];
		const sourceItems = [...sourceColumn.items];

		const [removed] = sourceItems.splice(source.index, 1);

		if (source.droppableId == destination.droppableId) {
			sourceItems.splice(destination.index, 0, removed);
		} else {
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
			<DynamicTodo onTodoFetch={handleTodoReceived} />
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
