/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description the landing page for the app.
 */

import React, { useState } from 'react';
import { Button, Col, Layout, Row, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import AddTodoModal from './AddTodoModal';
import ContentDashboard from './ContentDashboard';

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
				<ContentDashboard />
			</Content>
			<AddTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</Layout>
	);
};

export default Dashboard;
