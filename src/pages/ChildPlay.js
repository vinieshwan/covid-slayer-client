import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Typography,
	Box,
	Button,
	Slider,
	TextareaAutosize
} from '@material-ui/core/';
import HighlightIcon from '@material-ui/icons/Highlight';
import CloseIcon from '@material-ui/icons/Close';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

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
			handleLose('\nYou gave up!');
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

	const handleLose = (commentaryHandle = '') => {
		dispatch(
			endGameRequest({
				lost: true,
				commentary: commentaryHandle ? commentaryHandle : commentary
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
						<Typography variant="h6">{gameInfo.playerName} vs Covid</Typography>
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
						height: '80%',
						width: '100%',
						borderBottomRightRadius: '5px',
						borderBottomLeftRadius: '5px',
						padding: '0px',
						backgroundColor: '#1D2738'
					}}
					display="flex"
				>
					<Box flexGrow={1}>
						<Box p={1} display="flex" textAlign="center">
							<Box p={2} style={{ width: '100%' }}>
								<Box>
									<Typography variant="h5">{gameInfo.playerName}</Typography>
								</Box>
								<Box display="flex" alignSelf="center" justifyContent="center">
									<Avatar
										variant="rounded"
										src={`/images/${gameInfo.avatar}.jpg`}
										style={{
											margin: '10px',
											width: '160px',
											height: '160px'
										}}
									/>
								</Box>
								<Box>
									<Slider
										style={{ width: '60%', color: '#37dd4a' }}
										defaultValue={life.you}
										disabled
										getAriaValueText={() => {
											return `${life.you} %`;
										}}
										valueLabelDisplay="on"
										marks={[
											{ value: 0, label: '0%' },
											{ value: 100, label: '100 %' }
										]}
										value={life.you}
									/>
								</Box>
							</Box>
							<Box p={2} style={{ width: '100%' }}>
								<Box>
									<Typography variant="h5">Covid</Typography>
								</Box>
								<Box display="flex" alignSelf="center" justifyContent="center">
									<Avatar
										variant="rounded"
										src={`/images/virus.jpg`}
										style={{
											margin: '10px',
											width: '160px',
											height: '160px'
										}}
									/>
								</Box>
								<Box>
									<Slider
										style={{ width: '60%', color: '#37dd4a' }}
										defaultValue={life.enemy}
										disabled
										getAriaValueText={() => {
											return `${life.enemy} %`;
										}}
										valueLabelDisplay="on"
										marks={[
											{ value: 0, label: '0%' },
											{ value: 100, label: '100 %' }
										]}
										value={life.enemy}
									/>
								</Box>
							</Box>
						</Box>

						<Box
							display="flex"
							alignSelf="center"
							justifyContent="center"
							p={1}
						>
							<Box p={2}>
								<Button
									variant="contained"
									onClick={handleAttack}
									style={{ backgroundColor: '#0085fb', color: '#fff' }}
								>
									Attack
								</Button>
							</Box>
							<Box p={2}>
								<Button
									variant="contained"
									style={{ backgroundColor: '#de00c3', color: '#fff' }}
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
									style={{ backgroundColor: '#ff0404', color: '#fff' }}
									onClick={handleGiveUp}
								>
									Give up
								</Button>
							</Box>
						</Box>
					</Box>
					<Box
						p={1}
						style={{
							borderTop: '1px solid #131B29',
							height: '60vh',
							width: '30vh',
							backgroundColor: '#283346',
							textAlign: 'center'
						}}
					>
						<Box>
							<Typography variant="h6">
								Timer:{' '}
								<span
									style={{
										color: '#d8113a'
									}}
								>
									{timer}s
								</span>
							</Typography>
						</Box>
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
								rows={21}
								rowsMax={21}
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
		</div>
	);
};

export default ChildPlay;
