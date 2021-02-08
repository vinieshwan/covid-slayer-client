import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Box, Card } from '@material-ui/core';

import App from './App';
import store from './store';
import theme from './layout/';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container maxWidth="md">
					<Card>
						<Box
							justifyContent="center"
							alignItems="center"
							minHeight="50vh"
							alignSelf="center"
							p={2}
						>
							<App />
						</Box>
					</Card>
				</Container>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
