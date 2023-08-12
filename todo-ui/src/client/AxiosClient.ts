/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description axios client setup.
 */
import axios from 'axios';
import { TodoControllerApi } from './api/api';

const axiosInstance = axios.create();
const baseUrl = 'http://localhost:8089/';

class AxiosClient {
	TodoControllerApi: TodoControllerApi = new TodoControllerApi(undefined, baseUrl, axios);
}

export default AxiosClient;
