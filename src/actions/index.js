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
	await userLoginService(email, password)
		.then((result) => {
			dispatch(verifyUserSuccess(result.data.data.session));
		})
		.catch((error) => {
			dispatch(userLoginFailure(error.response));
			return;
		});
};

export const userLogoutRequest = () => (dispatch) => {
	dispatch(userLogout());
	userLogoutService();
};

export const verifyToken = (silentAuth = false) => async (dispatch) => {
	dispatch(verifyTokenStarted(silentAuth));

	verifyTokenService()
		.then((result) => {
			dispatch(verifyUserSuccess(result.data.data.session));
		})
		.catch((error) => {
			dispatch(verifyTokenEnd());
			if (error.response && [401, 403].includes(error.response.status))
				dispatch(userLogout());
			return;
		});
};

export const playGameRequest = () => async (dispatch) => {
	playGameService()
		.then((result) => {
			dispatch(playGameSuccess(result.data.data.settings));
		})
		.catch((error) => {
			dispatch(playGameFailure(error.response));
			return;
		});
};

export const endGameRequest = (update) => async (dispatch) => {
	gameSettings(update)
		.then((result) => {
			dispatch(endGameSuccess(result.data.data.settings));
		})
		.catch((error) => {
			dispatch(endGameFailure(error.response));
			return;
		});
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
