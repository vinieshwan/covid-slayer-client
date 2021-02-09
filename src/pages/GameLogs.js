import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloudDownload from '@material-ui/icons/CloudDownload';

import {
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextareaAutosize,
	Box,
	Button
} from '@material-ui/core/';
import { NavLink } from 'react-router-dom';

import { playGameRequest } from './../actions';
import { downloadGameLog } from './../services/';
const GameLogs = () => {
	const dispatch = useDispatch();

	const gameInfo = useSelector((state) => state.auth);
	const [commentary, setCommentary] = useState('');

	const handleDownload = (id) => {
		downloadGameLog(id)
			.then((result) => {
				setCommentary(result.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	useEffect(() => {
		dispatch(playGameRequest());
	}, []);

	const logs = (gamesPlayed) => {
		const logs = [];
		if (!gamesPlayed) {
			return <div>No game logs yet</div>;
		}
		for (let i = 1; i <= gamesPlayed; i++) {
			logs.push(
				<ListItem button onClick={handleDownload.bind(this, i)}>
					<ListItemIcon>
						<CloudDownload />
					</ListItemIcon>
					<ListItemText primary={`Game ${i}`} />
				</ListItem>
			);
		}

		return logs;
	};

	return (
		<div>
			<Box display="flex" p={1}>
				<Box p={2} flexGrow={1}>
					<Typography variant="h3">Game Logs</Typography>
				</Box>
				<Box p={2}>
					<NavLink component={Button} to="/dashboard">
						Dashboard
					</NavLink>
				</Box>
			</Box>
			<Box display="flex" p={1}>
				<Box p={2} flexGrow={1}>
					<List component="nav" aria-label="main mailbox folders">
						{logs(gameInfo.gamesPlayed)}
					</List>
				</Box>
				<Box p={2}>
					<Typography variant="caption">Game log:</Typography>
					<TextareaAutosize
						value={commentary}
						rows={20}
						style={{ width: '100%' }}
					/>
				</Box>
			</Box>
		</div>
	);
};

export default GameLogs;
