/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description modal to open for creating new todo's
 */

import React from 'react';
import { Form, FormInstance, Input, Modal, message as antdMessage } from 'antd';

import { CreateTodo, TodoResource } from '../../client/api';
import useCreateTodo from '../hooks/useCreateTodo';

interface IProps {
	form: FormInstance<any>;
	onTodoReceived: (todo: TodoResource) => void;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoModal: React.FC<IProps> = ({ form, onTodoReceived, isModalOpen, setIsModalOpen }) => {
	const createTodo = useCreateTodo();

	const handleFinish = (values: any) => {
		const createTodoPayload: CreateTodo = {
			title: values.title,
			description: values.description,
		};
		createTodo.mutate(
			{ createTodo: createTodoPayload },
			{
				onSuccess: (response) => {
					form.resetFields();
					setIsModalOpen(false);
					antdMessage.success('Successfully created new todo');
					onTodoReceived(response.data);
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
