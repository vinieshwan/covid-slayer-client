import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Typography, Box, Button, Icon } from '@material-ui/core/';
import HighlightIcon from '@material-ui/icons/Highlight';
import CloseIcon from '@material-ui/icons/Close';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import GamesIcon from '@material-ui/icons/Games';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { verifyToken, playGameRequest } from './../actions';

function Dashboard() {
	const dispatch = useDispatch();
	const authObj = useSelector((state) => state.auth);

	const { name, expiry, wins, losses, gamesPlayed } = authObj;

	useEffect(() => {
		setTimeout(() => {
			dispatch(verifyToken(true));
			dispatch(playGameRequest());
		}, expiry - 10 * 1000);
	}, []);

	return (
		<div>
			<Box p={1}>
				<Box
					p={2}
					style={{
						height: '50px',
						width: '100%',
						borderTopRightRadius: '5px',
						borderTopLeftRadius: '5px',
						padding: '10px',
						backgroundColor: '#283347'
					}}
					display="flex"
				>
					<Box flexGrow={1}>
						<Typography variant="h6">Welcome {name}!</Typography>
					</Box>
					<Box px={2}>
						<HighlightIcon style={{ color: '#FFD000' }} />
						{wins} wins
					</Box>
					<Box px={2}>
						<CloseIcon style={{ color: '#EC274F' }} />
						{losses} losses
					</Box>
					<Box px={2}>
						<SportsEsportsIcon style={{ color: '#37DD4A' }} />
						{gamesPlayed} games played
					</Box>
				</Box>
				<Box
					p={2}
					style={{
						height: '80%',
						width: '100%',
						borderBottomRightRadius: '5px',
						borderBottomLeftRadius: '5px',
						padding: '10px',
						backgroundColor: '#1D2738'
					}}
				>
					<Box display="flex" alignSelf="center" justifyContent="center" p={1}>
						<Box p={5}>
							<NavLink
								style={{
									background: '#293449',
									height: '100px',
									width: '200px'
								}}
								component={Button}
								to="/game-logs"
							>
								<LocalLibraryIcon
									style={{
										height: '60px',
										width: '60px',
										paddingRight: '10px',
										color: '#3EA1F9'
									}}
								/>
								<Typography variant="h6">Game Logs</Typography>
							</NavLink>
						</Box>
						<Box p={5}>
							<NavLink
								style={{
									background: '#293449',
									height: '100px',
									width: '200px'
								}}
								component={Button}
								to="/play-game"
							>
								<GamesIcon
									style={{
										height: '60px',
										width: '60px',
										paddingRight: '10px',
										color: '#E79221'
									}}
								/>
								<Typography variant="h6">New Game</Typography>
							</NavLink>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
}

export default Dashboard;
