/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description utility methods required
 */

import { TodoResourceStatusEnum } from '../client/api';
import { Columns } from '../typing/app';

export const mapTodoStatusToColumnKey = (status: TodoResourceStatusEnum): keyof Columns => {
	switch (status) {
		case TodoResourceStatusEnum.Todo:
			return 'todo';
		case TodoResourceStatusEnum.InProgress:
			return 'inProgress';
		case TodoResourceStatusEnum.Completed:
			return 'completed';
	}
};

export const mapColumnKeyToTodoStatus = (columnKey: string): TodoResourceStatusEnum | undefined => {
	switch (columnKey) {
		case 'todo':
			return TodoResourceStatusEnum.Todo;
		case 'inProgress':
			return TodoResourceStatusEnum.InProgress;
		case 'completed':
			return TodoResourceStatusEnum.Completed;
	}
	return undefined;
};
