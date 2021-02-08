import axios from 'axios';
const API_PATH = 'https://covid-slayer-server.herokuapp.com';

export const userLoginService = async (email, password) => {
	try {
		return await axios.post(`${API_PATH}/v1/login`, {
			email,
			password
		});
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const verifyTokenService = async () => {
	try {
		return await axios.get(`${API_PATH}/v1/refresh`);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const userLogoutService = async () => {
	try {
		return await axios.post(`${API_PATH}/v1/logout`);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const playGameService = async () => {
	try {
		return await axios.get(`${API_PATH}/v1/game-settings`);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const gameSettings = async (update) => {
	try {
		return await axios.put(`${API_PATH}/v1/update-game-settings`, update);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const downloadGameLog = async (game) => {
	try {
		return await axios.get(`${API_PATH}/v1/download-game-log`, {
			params: {
				game
			}
		});
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const getUser = async () => {
	try {
		return await axios.get(`${API_PATH}/v1/user`);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};

export const updateUser = async (update) => {
	try {
		return await axios.put(`${API_PATH}/v1/update-user`, update);
	} catch (err) {
		return {
			error: true,
			response: err.response
		};
	}
};
