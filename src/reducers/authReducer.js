import {
	VERIFY_ACCESS_STARTED,
	VERIFY_ACCESS_END,
	USER_LOGIN_STARTED,
	USER_LOGIN_FAILURE,
	VERIFY_USER_SUCCESS,
	USER_LOGOUT,
	PLAY_GAME_SUCCESS
} from '../actions/actionTypes';

const initialState = {
	expiry: null,
	name: null,
	avatar: null,
	authLoading: true,
	isAuthenticated: false,
	userLoginLoading: false,
	loginError: null,
	playerName: null,
	gameTime: null,
	wins: null,
	losses: null,
	gamesPlayed: null
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case VERIFY_ACCESS_STARTED:
			const { silentAuth } = action.payload;
			return silentAuth
				? {
						...state
				  }
				: initialState;
		case VERIFY_ACCESS_END:
			return {
				...state,
				authLoading: false
			};
		case USER_LOGIN_STARTED:
			return {
				...state,
				userLoginLoading: true
			};
		case USER_LOGIN_FAILURE:
			const { error } = action.payload;
			return {
				...state,
				loginError: error,
				userLoginLoading: false
			};
		case VERIFY_USER_SUCCESS:
			const { expiry, name, avatar } = action.payload;
			return {
				...state,
				expiry,
				avatar,
				name,
				isAuthenticated: true,
				authLoading: false,
				userLoginLoading: false
			};
		case USER_LOGOUT:
			return {
				...initialState,
				authLoading: false
			};
		case PLAY_GAME_SUCCESS:
			const {
				playerName,
				gameTime,
				wins,
				losses,
				gamesPlayed
			} = action.payload;
			return {
				...state,
				playerName,
				gameTime,
				wins,
				losses,
				gamesPlayed,
				isAuthenticated: true,
				authLoading: false,
				userLoginLoading: false
			};
		default:
			return state;
	}
};

export default auth;
