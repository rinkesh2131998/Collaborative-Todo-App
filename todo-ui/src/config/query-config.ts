/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description configs for react query client
 */

import { QueryClientConfig } from '@tanstack/react-query';

const config: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: false,
			retryDelay: 5000,
			refetchOnWindowFocus: false,
		},
	},
};

export default config;
