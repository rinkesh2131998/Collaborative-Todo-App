/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description used to create a new todo
 */

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import _ from 'lodash';

import api from '../client/RequestClient';
import { CreateTodo } from '../client/api';

interface IVariable {
	createTodo: CreateTodo;
}

const useCreateTodo = (): UseMutationResult<any, unknown, IVariable, any> => {
	return useMutation(
		async (payload) => {
			const data = api.TodoControllerApi.createTodo(payload.createTodo);
			return data;
		},
		{
			onSuccess: () => {
				console.log('Successfully completed the request');
			},
			onError: () => {
				console.log('Unable to complete the request');
			},
		},
	);
};
