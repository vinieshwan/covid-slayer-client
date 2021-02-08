import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playGameRequest } from './../actions';
import ChildPlay from './ChildPlay';

const Play = () => {
	const dispatch = useDispatch();

	const gameInfo = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(playGameRequest());
	}, [gameInfo]);

	return (
		<div>
			{gameInfo.gameTime ? (
				<ChildPlay gameInfo={gameInfo} />
			) : (
				<div>&nbsp;</div>
			)}
		</div>
	);
};

export default Play;
