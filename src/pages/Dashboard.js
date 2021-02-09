import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Avatar, Typography, Box, Button } from '@material-ui/core/';

import { verifyToken, userLogoutRequest } from './../actions';

function Dashboard() {
	const dispatch = useDispatch();
	const authObj = useSelector((state) => state.auth);

	const { name, expiry, avatar } = authObj;

	const handleLogout = () => {
		dispatch(userLogoutRequest());
	};

	useEffect(() => {
		setTimeout(() => {
			dispatch(verifyToken(true));
		}, expiry - 10 * 1000);
	}, []);

	return (
		<div>
			<div style={{ width: '100%' }}>
				<Box display="flex" p={1}>
					<Box>
						<Avatar
							src={`/images/${avatar}.jpg`}
							style={{
								margin: '10px',
								width: '60px',
								height: '60px'
							}}
						/>
					</Box>
					<Box p={2} flexGrow={1}>
						<Typography variant="h3">Welcome {name}!</Typography>
					</Box>
					<Box p={2}>
						<Button variant="contained" onClick={handleLogout}>
							Logout{' '}
						</Button>
					</Box>
				</Box>
			</div>
			<br />
			<Box display="flex" p={1}>
				<Box p={2}>
					<NavLink
						component={Button}
						activeClassName="active"
						to="/account-settings"
					>
						Account Settings
					</NavLink>
				</Box>
				<Box p={2}>
					<NavLink component={Button} to="/game-settings">
						Game Settings
					</NavLink>
				</Box>
				<Box p={2}>
					<NavLink component={Button} to="/game-logs">
						Game Logs
					</NavLink>
				</Box>

				<Box p={2}>
					<NavLink component={Button} to="/play-game">
						New Game
					</NavLink>
				</Box>
			</Box>
		</div>
	);
}

export default Dashboard;
