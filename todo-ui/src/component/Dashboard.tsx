/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description the landing page for the app.
 */

import React, { useState } from 'react';
import { Button, Col, Form, Layout, Row, Space, Typography, message as antdMessage } from 'antd';
import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';

import AddOrUpdateTodoModal from '../modal/AddTodoModal';
import ContentDashboard from './ContentDashboard';
import useCreateTodo from '../hooks/useCreateTodo';
import { CreateTodo } from '../client/api';

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [refreshCount, setRefreshCount] = useState<number>(0);
	const createTodo = useCreateTodo();

	const handleFinish = (values: any) => {
		const createTodoPayload: CreateTodo = {
			title: values.title,
			description: values.description,
		};
		createTodo.mutate(
			{ createTodo: createTodoPayload },
			{
				onSuccess: () => {
					form.resetFields();
					setIsModalOpen(false);
					antdMessage.success('Successfully created new todo');
				},
				onError: () => {
					setIsModalOpen(true);
					antdMessage.error('Unable to create new todo');
				},
			},
		);
	};

	return (
		<Layout>
			<Header className='app-header'>
				<Row justify='space-between'>
					<Col>
						<Typography.Text style={{ fontWeight: 600, fontSize: '30px' }}>TO-DO</Typography.Text>
					</Col>
					<Col>
						<Space>
							<Button type='primary' icon={<PlusCircleOutlined />} onClick={() => setIsModalOpen(true)}>
								Add Todo
							</Button>
							<Button
								type='primary'
								icon={<ReloadOutlined />}
								onClick={() => setRefreshCount((prevCount) => prevCount + 1)}
							>
								Reload Todos
							</Button>
						</Space>
					</Col>
				</Row>
			</Header>
			<Content className='app-content'>
				<ContentDashboard refreshCount={refreshCount} />
			</Content>
			<AddOrUpdateTodoModal
				form={form}
				handleFinish={handleFinish}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</Layout>
	);
};

export default Dashboard;
