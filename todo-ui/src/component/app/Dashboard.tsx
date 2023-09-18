/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description the landing page for the app.
 */

import React, { useState } from 'react';
import { Button, Col, Layout, Row, Space, Typography } from 'antd';
import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';

import ContentDashboard from './ContentDashboard';

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [refreshCount, setRefreshCount] = useState<number>(0);

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
				<ContentDashboard
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					refreshCount={refreshCount}
				/>
			</Content>
		</Layout>
	);
};

export default Dashboard;
