/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description the landing page for the app.
 */

import _ from 'lodash';
import { Button, Col, Layout, Row, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import AddTodoModal from './AddTodoModal';
import TodoCard from './TodoCard';
import { activeTodos } from '../data/dummy-data';

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<Layout>
			<Header className='app-header'>
				<Row>
					<Col>
						<Button type='primary' icon={<PlusCircleOutlined />} onClick={() => setIsModalOpen(true)}>
							Add Todo
						</Button>
					</Col>
				</Row>
			</Header>
			<Content className='app-content'>
				<Row>
					<Col flex={10}>
						<Typography.Title>Active Todos</Typography.Title>
						{_.map(activeTodos, (todo) => (
							<TodoCard todoResource={todo} />
						))}
					</Col>
					<Col flex={4} />
					<Col flex={10}>
						<Typography.Title>Completed Todos</Typography.Title>
					</Col>
				</Row>
			</Content>
			<AddTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</Layout>
	);
};

export default Dashboard;
