/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description hook to delete a todo resource
 */

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import _ from 'lodash';

import api from '../client/RequestClient';

interface IVariable {
	uuid: string;
}

const useDeleteTodo = (): UseMutationResult<any, unknown, IVariable, unknown> => {
	return useMutation(async (payload) => {
		const { data } = await api.TodoControllerApi.deleteTodo(payload.uuid);
		return data;
	});
};

export default useDeleteTodo;
