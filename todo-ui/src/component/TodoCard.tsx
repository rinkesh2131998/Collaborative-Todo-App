/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description card to render todo's.
 */

import React from 'react';
import { TodoResource } from '../client/api';
import { Button, Card, Descriptions, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface IProps {
	todoResource?: TodoResource;
}

const TodoCard: React.FC<IProps> = ({ todoResource }) => {
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
		<div>
			<Card
				key={todoResource?.id}
				className='todo-card'
				title={todoResource?.title}
				extra={extra}
				bodyStyle={{ maxHeight: '600px', overflowY: 'scroll' }}
			>
				<Typography.Text>{todoResource?.description}</Typography.Text>
			</Card>
		</div>
	);
};

export default TodoCard;
