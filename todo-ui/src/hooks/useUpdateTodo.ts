/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description hook to update a todo
 */

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import _ from 'lodash';

import api from '../client/RequestClient';
import { UpdateTodo } from '../client/api';
import { version } from 'react';

interface IVariable {
	uuid: string;
	version: number;
	updateTodo: UpdateTodo;
}

const useUpdateTodo = (): UseMutationResult<any, unknown, IVariable, unknown> => {
	return useMutation(async (payload) => {
		const { data } = await api.TodoControllerApi.updateTodo(payload.uuid, payload.updateTodo, payload.version);
		return data;
	});
};

export default useUpdateTodo;
