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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CreateTodo } from '../Models';
// @ts-ignore
import { TodoResource } from '../Models';
// @ts-ignore
import { UpdateTodo } from '../Models';
/**
 * TodoControllerApi - axios parameter creator
 * @export
 */
export const TodoControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateTodo} createTodo 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTodo: async (createTodo: CreateTodo, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createTodo' is not null or undefined
            assertParamExists('createTodo', 'createTodo', createTodo)
            const localVarPath = `/todo`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createTodo, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} uuid 
         * @param {number} [ifMatch] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTodo: async (uuid: string, ifMatch?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uuid' is not null or undefined
            assertParamExists('deleteTodo', 'uuid', uuid)
            const localVarPath = `/todo/{uuid}`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (uuid !== undefined) {
                localVarQueryParameter['uuid'] = uuid;
            }

            if (ifMatch != null) {
                localVarHeaderParameter['If-Match'] = typeof ifMatch === 'string' 
                    ? ifMatch 
                    : JSON.stringify(ifMatch);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllTodos: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/todo`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvents: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/todo/events`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodo: async (uuid: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uuid' is not null or undefined
            assertParamExists('getTodo', 'uuid', uuid)
            const localVarPath = `/todo/{uuid}`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (uuid !== undefined) {
                localVarQueryParameter['uuid'] = uuid;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} uuid 
         * @param {UpdateTodo} updateTodo 
         * @param {number} [ifMatch] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTodo: async (uuid: string, updateTodo: UpdateTodo, ifMatch?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uuid' is not null or undefined
            assertParamExists('updateTodo', 'uuid', uuid)
            // verify required parameter 'updateTodo' is not null or undefined
            assertParamExists('updateTodo', 'updateTodo', updateTodo)
            const localVarPath = `/todo/{uuid}`
                .replace(`{${"uuid"}}`, encodeURIComponent(String(uuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (ifMatch != null) {
                localVarHeaderParameter['If-Match'] = typeof ifMatch === 'string' 
                    ? ifMatch 
                    : JSON.stringify(ifMatch);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateTodo, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TodoControllerApi - functional programming interface
 * @export
 */
export const TodoControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TodoControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateTodo} createTodo 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createTodo(createTodo: CreateTodo, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TodoResource>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createTodo(createTodo, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} uuid 
         * @param {number} [ifMatch] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteTodo(uuid: string, ifMatch?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteTodo(uuid, ifMatch, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllTodos(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TodoResource>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllTodos(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getEvents(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<object>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getEvents(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTodo(uuid: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TodoResource>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTodo(uuid, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} uuid 
         * @param {UpdateTodo} updateTodo 
         * @param {number} [ifMatch] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateTodo(uuid: string, updateTodo: UpdateTodo, ifMatch?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TodoResource>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateTodo(uuid, updateTodo, ifMatch, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TodoControllerApi - factory interface
 * @export
 */
export const TodoControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TodoControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {CreateTodo} createTodo 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTodo(createTodo: CreateTodo, options?: any): AxiosPromise<TodoResource> {
            return localVarFp.createTodo(createTodo, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} uuid 
         * @param {number} [ifMatch] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTodo(uuid: string, ifMatch?: number, options?: any): AxiosPromise<void> {
            return localVarFp.deleteTodo(uuid, ifMatch, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllTodos(options?: any): AxiosPromise<Array<TodoResource>> {
            return localVarFp.getAllTodos(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvents(options?: any): AxiosPromise<Array<object>> {
            return localVarFp.getEvents(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodo(uuid: string, options?: any): AxiosPromise<TodoResource> {
            return localVarFp.getTodo(uuid, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} uuid 
         * @param {UpdateTodo} updateTodo 
         * @param {number} [ifMatch] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTodo(uuid: string, updateTodo: UpdateTodo, ifMatch?: number, options?: any): AxiosPromise<TodoResource> {
            return localVarFp.updateTodo(uuid, updateTodo, ifMatch, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TodoControllerApi - interface
 * @export
 * @interface TodoControllerApi
 */
export interface TodoControllerApiInterface {
    /**
     * 
     * @param {CreateTodo} createTodo 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApiInterface
     */
    createTodo(createTodo: CreateTodo, options?: AxiosRequestConfig): AxiosPromise<TodoResource>;

    /**
     * 
     * @param {string} uuid 
     * @param {number} [ifMatch] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApiInterface
     */
    deleteTodo(uuid: string, ifMatch?: number, options?: AxiosRequestConfig): AxiosPromise<void>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApiInterface
     */
    getAllTodos(options?: AxiosRequestConfig): AxiosPromise<Array<TodoResource>>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApiInterface
     */
    getEvents(options?: AxiosRequestConfig): AxiosPromise<Array<object>>;

    /**
     * 
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApiInterface
     */
    getTodo(uuid: string, options?: AxiosRequestConfig): AxiosPromise<TodoResource>;

    /**
     * 
     * @param {string} uuid 
     * @param {UpdateTodo} updateTodo 
     * @param {number} [ifMatch] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApiInterface
     */
    updateTodo(uuid: string, updateTodo: UpdateTodo, ifMatch?: number, options?: AxiosRequestConfig): AxiosPromise<TodoResource>;

}

/**
 * TodoControllerApi - object-oriented interface
 * @export
 * @class TodoControllerApi
 * @extends {BaseAPI}
 */
export class TodoControllerApi extends BaseAPI implements TodoControllerApiInterface {
    /**
     * 
     * @param {CreateTodo} createTodo 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApi
     */
    public createTodo(createTodo: CreateTodo, options?: AxiosRequestConfig) {
        return TodoControllerApiFp(this.configuration).createTodo(createTodo, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} uuid 
     * @param {number} [ifMatch] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApi
     */
    public deleteTodo(uuid: string, ifMatch?: number, options?: AxiosRequestConfig) {
        return TodoControllerApiFp(this.configuration).deleteTodo(uuid, ifMatch, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApi
     */
    public getAllTodos(options?: AxiosRequestConfig) {
        return TodoControllerApiFp(this.configuration).getAllTodos(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApi
     */
    public getEvents(options?: AxiosRequestConfig) {
        return TodoControllerApiFp(this.configuration).getEvents(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApi
     */
    public getTodo(uuid: string, options?: AxiosRequestConfig) {
        return TodoControllerApiFp(this.configuration).getTodo(uuid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} uuid 
     * @param {UpdateTodo} updateTodo 
     * @param {number} [ifMatch] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoControllerApi
     */
    public updateTodo(uuid: string, updateTodo: UpdateTodo, ifMatch?: number, options?: AxiosRequestConfig) {
        return TodoControllerApiFp(this.configuration).updateTodo(uuid, updateTodo, ifMatch, options).then((request) => request(this.axios, this.basePath));
    }
}
