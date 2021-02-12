import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloudDownload from '@material-ui/icons/CloudDownload';
import HighlightIcon from '@material-ui/icons/Highlight';
import CloseIcon from '@material-ui/icons/Close';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

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

	const handleDownload = async (id) => {
		const result = await downloadGameLog(id);
		if (result.error) {
			alert(result.message);
			return;
		}

		setCommentary(result.data);
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
					<ListItemText primary={`Game ${i}`} />
				</ListItem>
			);
		}

		return logs;
	};

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
						<Typography variant="h6">Game logs</Typography>
					</Box>
					<Box px={2}>
						<HighlightIcon style={{ color: '#FFD000' }} />
						{gameInfo.wins} wins
					</Box>
					<Box px={2}>
						<CloseIcon style={{ color: '#EC274F' }} />
						{gameInfo.losses} losses
					</Box>
					<Box px={2}>
						<SportsEsportsIcon style={{ color: '#37DD4A' }} />
						{gameInfo.gamesPlayed} games played
					</Box>
				</Box>
				<Box
					p={2}
					style={{
						height: '68vh',
						width: '100%',
						borderBottomRightRadius: '5px',
						borderBottomLeftRadius: '5px',
						padding: '0px',
						backgroundColor: '#1D2738'
					}}
					display="flex"
				>
					<Box flexGrow={1} style={{ overflow: 'auto' }}>
						<List component="nav">{logs(gameInfo.gamesPlayed)}</List>
					</Box>
					<Box
						p={1}
						style={{
							borderTop: '1px solid #131B29',
							width: '30vh',
							backgroundColor: '#283346',
							textAlign: 'center'
						}}
					>
						<Box
							style={{
								paddingBottom: '4px'
							}}
						>
							<Typography variant="caption">Commentary</Typography>
						</Box>
						<Box>
							<TextareaAutosize
								value={commentary}
								rows={27}
								rowsMax={27}
								style={{
									textAlign: 'center',
									width: '100%',
									color: '#fff',
									backgroundColor: '#2f3746',
									borderRadius: '5px'
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* <Box display="flex" p={1}>
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
			</Box> */}
		</div>
	);
};

export default GameLogs;
