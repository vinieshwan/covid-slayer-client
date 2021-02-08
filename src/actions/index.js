import {
	VERIFY_ACCESS_STARTED,
	VERIFY_USER_SUCCESS,
	VERIFY_ACCESS_END,
	USER_LOGIN_STARTED,
	USER_LOGIN_FAILURE,
	USER_LOGOUT,
	PLAY_GAME_FAILURE,
	PLAY_GAME_SUCCESS,
	END_GAME_FAILURE,
	END_GAME_SUCCESS
} from './actionTypes';

import {
	verifyTokenService,
	userLoginService,
	userLogoutService,
	playGameService,
	gameSettings
} from '../services';

export const userLogin = ({ email, password }) => async (dispatch) => {
	dispatch(userLoginStarted());

	const result = await userLoginService(email, password);

	if (result.error) {
		dispatch(userLoginFailure(result.response.data.message));
		return;
	}

	dispatch(verifyUserSuccess(result.data.data.session));
};

export const userLogoutRequest = () => (dispatch) => {
	dispatch(userLogout());
	userLogoutService();
};

export const verifyToken = (silentAuth = false) => async (dispatch) => {
	dispatch(verifyTokenStarted(silentAuth));

	const result = await verifyTokenService();

	if (result.error) {
		dispatch(verifyTokenEnd());
		if (result.response && [401, 403].includes(result.response.status))
			dispatch(userLogout());
		return;
	}

	if (result.status === 204) dispatch(verifyTokenEnd());
	else dispatch(verifyUserSuccess(result.data.data.session));
};

export const playGameRequest = () => async (dispatch) => {
	const result = await playGameService();

	if (result.error) {
		dispatch(playGameFailure(result.response.data.message));
		return;
	}

	dispatch(playGameSuccess(result.data.data.settings));
};

export const endGameRequest = (update) => async (dispatch) => {
	const result = await gameSettings(update);

	if (result.error) {
		dispatch(endGameFailure(result.response.data.message));
		return;
	}

	dispatch(endGameSuccess(result.data.data.settings));
};

export const userLoginStarted = () => {
	return {
		type: USER_LOGIN_STARTED
	};
};

export const verifyUserSuccess = ({ expiry, name, avatar }) => {
	return {
		type: VERIFY_USER_SUCCESS,
		payload: {
			expiry,
			name,
			avatar
		}
	};
};

export const userLoginFailure = (
	error = 'Something went wrong. Please try again later.'
) => {
	return {
		type: USER_LOGIN_FAILURE,
		payload: {
			error
		}
	};
};

export const userLogout = () => {
	return {
		type: USER_LOGOUT
	};
};

export const verifyTokenStarted = (silentAuth = false) => {
	return {
		type: VERIFY_ACCESS_STARTED,
		payload: {
			silentAuth
		}
	};
};

export const verifyTokenEnd = () => {
	return {
		type: VERIFY_ACCESS_END
	};
};

export const playGameFailure = (
	error = 'Something went wrong. Please try again later.'
) => {
	return {
		type: PLAY_GAME_FAILURE,
		payload: {
			error
		}
	};
};

export const playGameSuccess = ({
	playerName,
	gameTime,
	losses,
	wins,
	gamesPlayed
}) => {
	return {
		type: PLAY_GAME_SUCCESS,
		payload: {
			playerName,
			gameTime,
			losses,
			wins,
			gamesPlayed
		}
	};
};

export const endGameFailure = (
	error = 'Something went wrong. Please try again later.'
) => {
	return {
		type: END_GAME_FAILURE,
		payload: {
			error
		}
	};
};

export const endGameSuccess = ({
	playerName,
	gameTime,
	losses,
	wins,
	gamesPlayed
}) => {
	return {
		type: END_GAME_SUCCESS,
		payload: {
			playerName,
			gameTime,
			losses,
			wins,
			gamesPlayed
		}
	};
};
