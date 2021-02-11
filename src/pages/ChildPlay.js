import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Typography,
	Box,
	Button,
	TextareaAutosize
} from '@material-ui/core/';

import { endGameRequest } from './../actions';

const ChildPlay = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [life, setLife] = useState({
		you: 100,
		enemy: 100
	});
	const [commentary, setCommentary] = useState('');

	const [timer, setTimer] = useState(props.gameInfo.gameTime);
	const gameInfo = props.gameInfo;

	const handleGiveUp = () => {
		if (window.confirm('Are you sure you want to quit?')) {
			handleLose();
		}
	};

	const randomPoints = (minPoints, maxPoints) => {
		return Math.floor(Math.random() * (maxPoints - minPoints) + minPoints);
	};

	const handleWin = () => {
		dispatch(
			endGameRequest({
				won: true,
				commentary
			})
		);
		alert('You win');
		history.push('/dashboard');
	};

	const handleLose = () => {
		dispatch(
			endGameRequest({
				lost: true,
				commentary: commentary ? commentary : ''
			})
		);
		alert('You lose');
		history.push('/dashboard');
	};

	const handleAttack = () => {
		const lifeHandle = {
			you: life.you - randomPoints(0, 10),
			enemy: life.enemy - randomPoints(0, 10)
		};

		setCommentary(
			`${commentary} \n Covid attacked ${gameInfo.playerName} by ${
				life.you - lifeHandle.you
			}% \n ${gameInfo.playerName} attacked Covid by ${
				life.enemy - lifeHandle.enemy
			}%`
		);

		if (lifeHandle.enemy < 0) {
			handleWin();
		} else if (lifeHandle.you < 0) {
			handleLose();
		}

		setLife(lifeHandle);
	};

	const handleBlast = () => {
		const lifeHandle = {
			you: life.you - randomPoints(10, 20),
			enemy: life.enemy - randomPoints(10, 20)
		};

		setCommentary(
			`${commentary} \n Covid attacked ${gameInfo.playerName} by ${
				life.you - lifeHandle.you
			}% \n ${gameInfo.playerName} attacked Covid by ${
				life.enemy - lifeHandle.enemy
			}%`
		);

		if (lifeHandle.enemy < 0) {
			handleWin();
		} else if (lifeHandle.you < 0) {
			handleLose();
		}

		setLife(lifeHandle);
	};

	const handleHeal = () => {
		const heal = randomPoints(10, 30);
		const attack = randomPoints(0, 10);

		const lifeHandle = {
			you: life.you + heal - attack,
			enemy: life.enemy
		};

		setCommentary(
			`${commentary} \n ${gameInfo.playerName} got healed by ${heal}% \n but Covid attacked ${gameInfo.playerName} by ${attack}%`
		);

		if (lifeHandle.you < 100) {
			setLife(lifeHandle);
		} else {
			lifeHandle.you = 100;
			setLife(lifeHandle);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			if (timer <= 0) {
				handleLose();
			} else {
				setTimer(timer - 1);
			}
		}, 1000);
	}, [timer]);

	return (
		<div>
			<Box display="flex" p={1}>
				<Box p={2}>
					<Typography variant="h6">
						Total Games Played: {gameInfo.gamesPlayed}
					</Typography>
				</Box>
				<Box p={2}>
					<Typography variant="h6">Total Wins: {gameInfo.wins}</Typography>
				</Box>
				<Box p={2}>
					<Typography variant="h6">Total Losses: {gameInfo.losses}</Typography>
				</Box>
			</Box>
			<Box display="flex" p={1}>
				<Box p={2} flexGrow={1}>
					<Box display="flex" p={1}>
						<Box p={2} flexGrow={1}>
							<Avatar
								src={`/images/${gameInfo.avatar}.jpg`}
								style={{
									margin: '10px',
									width: '60px',
									height: '60px'
								}}
							/>
							<Typography variant="h3"> {gameInfo.playerName}</Typography>
							<Typography variant="h6"> {life.you}%</Typography>
						</Box>
						<Box p={2} flexGrow={1}>
							<Avatar
								src={`/images/virus.jpg`}
								style={{
									margin: '10px',
									width: '60px',
									height: '60px'
								}}
							/>
							<Typography variant="h3">Covid</Typography>
							<Typography variant="h6"> {life.enemy}%</Typography>
						</Box>
					</Box>
					<Box display="flex" p={1}>
						<Box p={2}>
							<Button
								variant="contained"
								color="primary"
								onClick={handleAttack}
							>
								Attack
							</Button>
						</Box>
						<Box p={2}>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleBlast}
							>
								Blast
							</Button>
						</Box>
						<Box p={2}>
							<Button
								variant="contained"
								style={{ backgroundColor: '#04d004', color: '#fff' }}
								onClick={handleHeal}
							>
								Heal
							</Button>
						</Box>
						<Box p={2}>
							<Button
								variant="contained"
								style={{ backgroundColor: 'red', color: '#fff' }}
								onClick={handleGiveUp}
							>
								Give up
							</Button>
						</Box>
					</Box>
				</Box>
				<Box p={2}>
					<Typography variant="h3" color="error">
						Timer: {timer}s
					</Typography>
					<Typography variant="caption">Game commentary:</Typography>
					<TextareaAutosize
						value={commentary}
						rows={20}
						style={{ width: '100%' }}
					/>
				</Box>
			</Box>{' '}
		</div>
	);
};

export default ChildPlay;
