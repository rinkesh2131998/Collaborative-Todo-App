/**
 * @author Rinkesh <rinkesh.agrawal@314ecorp.com>
 * @description root component.
 */
import React from 'react';
import Dashboard from './component/Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './style/style.css';
import config from './config/query-config';

const queryClient = new QueryClient(config);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Dashboard />
		</QueryClientProvider>
	);
};

export default App;
