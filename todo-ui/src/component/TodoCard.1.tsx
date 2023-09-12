import React, { useState } from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import UpdateTodoModal from '../modal/UpdateTodoModal';
import useDeleteTodo from '../hooks/useDeleteTodo';
import { IProps } from './TodoCard';

export const TodoCard: React.FC<IProps> = ({ todoResource, index }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	useDeleteTodo();

	const extra = (
		<Space>
			<Button icon={<EditOutlined />} type='text' onClick={() => setIsModalOpen(true)} />
			<Button
				icon={<DeleteOutlined />}
				type='text'
				onClick={() => {
					console.log('delete todo');
				}}
			/>
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
			<UpdateTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} todo={todoResource} />
		</>
	);
};
