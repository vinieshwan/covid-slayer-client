import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core/';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Game from './pages/Game';
import Play from './pages/Play';
import Account from './pages/Account';
import GameLogs from './pages/GameLogs';
import Sidebar from './layout/Sidebar';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Header from './layout/Header';
import { verifyToken } from './actions';

const App = () => {
	const authObj = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { authLoading, isAuthenticated, expiry, avatar } = authObj;

	useEffect(() => {
		setTimeout(() => {
			dispatch(verifyToken(true));
		}, expiry - 10 * 1000);
	}, []);

	if (authLoading) {
		return (
			<Box display="flex">
				<Box
					justifyContent="center"
					style={{ width: '100%', height: '100%' }}
					p={2}
				>
					<Header />
					<Box display="flex" justifyContent="center" alignSelf="center">
						<br />
						<br />
						<br />
						Checking Authentication...
					</Box>
				</Box>
			</Box>
		);
	}

	return (
		<BrowserRouter>
			<Box display="flex">
				{isAuthenticated ? (
					<Box>
						<Sidebar avatar={avatar} />
					</Box>
				) : (
					''
				)}
				<Box justifyContent="center" style={{ width: '100%' }} p={2}>
					<Header />
					<Switch>
						<PublicRoute path="/signup" component={Signup} />
						<PublicRoute
							path="/login"
							component={Login}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path="/dashboard"
							component={Dashboard}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path="/game-settings"
							component={Game}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path="/account-settings"
							component={Account}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path="/game-logs"
							component={GameLogs}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path="/play-game"
							component={Play}
							isAuthenticated={isAuthenticated}
						/>
						<Redirect to={isAuthenticated ? '/dashboard' : '/login'} />
					</Switch>
				</Box>
			</Box>
		</BrowserRouter>
	);
};

export default App;
