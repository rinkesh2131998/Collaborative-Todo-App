/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface UpdateTodo
 */
export interface UpdateTodo {
    /**
     * 
     * @type {string}
     * @memberof UpdateTodo
     */
    'description'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateTodo
     */
    'todoStatus'?: UpdateTodoTodoStatusEnum;
}

export const UpdateTodoTodoStatusEnum = {
    Todo: 'TODO',
    Progress: 'PROGRESS',
    Completed: 'COMPLETED'
} as const;

export type UpdateTodoTodoStatusEnum = typeof UpdateTodoTodoStatusEnum[keyof typeof UpdateTodoTodoStatusEnum];


