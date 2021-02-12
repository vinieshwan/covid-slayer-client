import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TextField, Button, Typography, Box } from '@material-ui/core/';

import { playGameRequest, endGameRequest } from './../actions';

const Game = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const authObj = useSelector((state) => state.auth);

	const { playerName, gamesPlayed, wins, losses, gameTime } = authObj;

	const [inputs, setInputs] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();

		const inputsHolder = inputs;

		if (inputs.gameTime) {
			inputsHolder.gameTime = parseInt(inputsHolder.gameTime, 10);
		}
		dispatch(endGameRequest(inputsHolder));
		alert('Successfully updated!');
		history.push('/dashboard');
	};

	useEffect(() => {
		dispatch(playGameRequest());
	}, []);
	return (
		<div style={{ width: '100%' }}>
			<Box display="flex" p={1}>
				<Box p={2} flexGrow={1}>
					<Typography variant="h3">Game Settings</Typography>
				</Box>
			</Box>
			<form onSubmit={handleSubmit}>
				<TextField
					label={`Player Name: ${playerName}`}
					variant="outlined"
					type="text"
					value={inputs.playerName ? inputs.playerName : ''}
					error={inputs.playerName && inputs.playerName.trim() === ''}
					helperText={
						inputs.playerName && inputs.playerName.trim() === ''
							? 'Empty!'
							: ' '
					}
					onChange={(e) => {
						setInputs({ ...inputs, playerName: e.target.value });
					}}
				/>
				<br />
				<TextField
					label={`Game Time: ${gameTime}`}
					variant="outlined"
					type="text"
					value={inputs.gameTime ? inputs.gameTime : ''}
					error={inputs.gameTime && inputs.gameTime.trim() === ''}
					helperText={
						inputs.gameTime && inputs.gameTime.trim() === '' ? 'Empty!' : ' '
					}
					value={inputs.gameTime}
					onChange={(e) => {
						setInputs({ ...inputs, gameTime: e.target.value });
					}}
				/>

				<br />
				<br />
				<Button type="submit" variant="contained" color="secondary">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Game;
