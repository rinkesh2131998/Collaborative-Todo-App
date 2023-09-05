/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description modal to open for creating new todo's
 */

import React, { useState } from 'react';
import { Form, Input, Modal, Typography, message as antdMessage } from 'antd';

import useCreateTodo from '../hooks/useCreateTodo';
import { CreateTodo } from '../client/api';

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoModal: React.FC<IProps> = ({ isModalOpen, setIsModalOpen }) => {
	const [form] = Form.useForm();
	const [description, setDescription] = useState<string>('');
	const [title, setTitle] = useState<string>('');
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

	const handleOk = () => {
		form.submit();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
			<Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={handleFinish}>
				<Form.Item name='title' label='Title' rules={[{ required: true }]}>
					<Input placeholder='Enter Todo Title' />
				</Form.Item>
				<Form.Item name='description' label='Description' rules={[{ required: true }]}>
					<Input.TextArea placeholder='Enter Todo Description' autoSize={{ minRows: 4 }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddTodoModal;
