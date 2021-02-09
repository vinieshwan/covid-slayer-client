import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Game from './pages/Game';
import Play from './pages/Play';
import Account from './pages/Account';
import GameLogs from './pages/GameLogs';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import { verifyToken } from './actions';

const App = () => {
	const authObj = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { authLoading, isAuthenticated, expiry } = authObj;

	useEffect(() => {
		setTimeout(() => {
			dispatch(verifyToken(true));
		}, expiry - 10 * 1000);
	}, []);

	if (authLoading) {
		return <div className="content">Checking Authentication...</div>;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<div>
					<div className="content">
						<Switch>
							<PublicRoute
								path="/login"
								component={Login}
								isAuthenticated={isAuthenticated}
							/>
							<PublicRoute
								path="/signup"
								component={Signup}
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
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
