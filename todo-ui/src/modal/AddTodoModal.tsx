/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description modal to open for creating new todo's
 */

import React from 'react';
import { Form, FormInstance, Input, Modal, Typography, message as antdMessage } from 'antd';

interface IProps {
	form: FormInstance<any>;
	handleFinish: (values: any) => void;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoModal: React.FC<IProps> = ({ form, handleFinish, isModalOpen, setIsModalOpen }) => {
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
