/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description modal to open for updating new todo's
 */

import React from 'react';
import { Form, Input, Modal, message as antdMessage } from 'antd';
import { TodoResource, UpdateTodo } from '../../client/api';
import useUpdateTodo from '../hooks/useUpdateTodo';

interface IProps {
	todo: TodoResource;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateTodoModal: React.FC<IProps> = ({ todo, isModalOpen, setIsModalOpen }) => {
	const [form] = Form.useForm();
	const updateTodo = useUpdateTodo();

	const handleFinish = (values: any) => {
		const updateTodoPayload: UpdateTodo = {
			todoStatus: todo.status,
			title: values.title,
			description: values.description,
		};

		updateTodo.mutate(
			{ uuid: todo.id, updateTodo: updateTodoPayload, version: todo.version },
			{
				onSuccess: (data) => {
					form.resetFields();
					setIsModalOpen(false);
					antdMessage.success('Updated Todo');
				},
				onError: () => {
					antdMessage.error('Unable to update todo');
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
			<Form
				form={form}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				onFinish={handleFinish}
				initialValues={{ title: todo.title, description: todo.description }}
			>
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

export default UpdateTodoModal;
