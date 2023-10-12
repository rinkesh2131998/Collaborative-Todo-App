/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description card to render todo's.
 */

import React, { useState } from 'react';
import { Button, Card, Space, Typography, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import UpdateTodoModal from '../modal/UpdateTodoModal';
import useDeleteTodo from '../hooks/useDeleteTodo';
import { Columns } from '../../typing/app';
import { TodoResource } from '../../client/api';
import { mapTodoStatusToColumnKey } from '../../util/util';

interface IProps {
	key: string;
	todoResource: TodoResource;
	index: number;
}

const TodoCard: React.FC<IProps> = ({ todoResource, index}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const deleteTodo = useDeleteTodo();

	const handleDelete = () => {
		deleteTodo.mutate(
			{ uuid: todoResource.id, version: todoResource.version },
			{
				onSuccess: () => {
					message.success('Deleted todo');
				},
				onError: () => {
					message.error('Unable to delete todo');
				},
			},
		);
	};

	const extra = (
		<Space>
			<Button icon={<EditOutlined />} type='text' onClick={() => setIsModalOpen(true)} />
			<Button icon={<DeleteOutlined />} type='text' onClick={handleDelete} />
		</Space>
	);

	return (
		<>
			<Draggable index={index} draggableId={todoResource.id} key={todoResource.id}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Card
							className='todo-card'
							bodyStyle={{ maxHeight: '600px', overflowY: 'scroll' }}
							key={todoResource?.id}
							title={todoResource?.title}
							extra={extra}
						>
							<Typography.Text>{todoResource?.description}</Typography.Text>
						</Card>
					</div>
				)}
			</Draggable>
			<UpdateTodoModal
				key={isModalOpen ? 'open' : 'closed'}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				todo={todoResource}
			/>
		</>
	);
};

export default TodoCard;
