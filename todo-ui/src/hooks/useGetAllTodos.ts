/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description get all todos hook.
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import api from '../client/RequestClient';

export const CACHE_QUERY_KEY_FETCH_TODOS = 'fetch-all-todos';

const useGetAllTodos = () => {};
