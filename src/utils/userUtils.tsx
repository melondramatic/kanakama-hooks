export const parseUser = () => {
	const user = localStorage.getItem('user');
	if (user === null) {
		return null;
	}
	return JSON.parse(user);
};
