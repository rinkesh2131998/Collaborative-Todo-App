/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description card to render todo's.
 */

import React from 'react';
import { TodoResource } from '../client/api';
import { Button, Card, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

interface IProps {
	key: string;
	todoResource: TodoResource;
	index: number;
}

const TodoCard: React.FC<IProps> = ({ todoResource, index }) => {
	const extra = (
		<Space>
			<Button
				icon={<EditOutlined />}
				type='text'
				onClick={() => {
					console.log('edit todo');
				}}
			/>
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
	);
};

export default TodoCard;
