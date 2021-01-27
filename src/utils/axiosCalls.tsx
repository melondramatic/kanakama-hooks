import axios from 'axios';
import { parseUser } from './userUtils';

const SERVER_URL =
	process.env.NODE_ENV === 'production'
		? 'https://knkm-server.herokuapp.com'
		: 'http://localhost:8080';

export const CreateUser = (
	username: string,
	password: string,
	email: string
) => {
	return axios.post(`${SERVER_URL}/user/add`, { username, password, email });
};

export const LogIn = (username: string, password: string) => {
	return axios.post(`${SERVER_URL}/user/login`, { username, password });
};

export const buildAuthHeader = () => {
	const parsedUser = parseUser();
	if (parsedUser.accessToken) {
		return { 'x-access-token': parsedUser.accessToken };
	} else {
		return null;
	}
};

export const GetStats = () => {
	const parsedUser = parseUser();

	if (parsedUser) {
		return axios.post(
			`${SERVER_URL}/user/stats`,
			{
				username: parsedUser.username,
			},
			{ headers: buildAuthHeader() }
		);
	} else {
		return Promise.reject('cannot find user data');
	}
};

export const UpdateStats = () => {
	const parsedUser = parseUser();

	if (parsedUser) {
		return axios.post(
			`${SERVER_URL}/user/stats/update`,
			{
				username: parsedUser.username,
				stats: localStorage.getItem('updateList'),
			},
			{ headers: buildAuthHeader() }
		);
	} else {
		return Promise.reject('cannot find user data');
	}
};
