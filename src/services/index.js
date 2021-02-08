import axios from 'axios';

export const userLoginService = async (email, password) => {
	try {
		return await axios.post(
			'https://covid-slayer-server.herokuapp.com/v1/login',
			{
				email,
				password
			}
		);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const verifyTokenService = async () => {
	try {
		return await axios.get(
			'https://covid-slayer-server.herokuapp.com/v1/refresh'
		);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const userLogoutService = async () => {
	try {
		return await axios.post(
			'https://covid-slayer-server.herokuapp.com/v1/logout'
		);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const playGameService = async () => {
	try {
		return await axios.get(
			'https://covid-slayer-server.herokuapp.com/v1/game-settings'
		);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const gameSettings = async (update) => {
	try {
		return await axios.put(
			'https://covid-slayer-server.herokuapp.com/v1/update-game-settings',
			update
		);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const downloadGameLog = async (game) => {
	try {
		return await axios.get(
			'https://covid-slayer-server.herokuapp.com/v1/download-game-log',
			{
				params: {
					game
				}
			}
		);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};
