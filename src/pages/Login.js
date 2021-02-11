import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core/';

import { userLogin } from './../actions';

function Login() {
	const [inputs, setInputs] = useState({
		email: null,
		password: null
	});

	const authObj = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { userLoginLoading, loginError } = authObj;

	const handleLogin = (event) => {
		event.preventDefault();

		dispatch(userLogin(inputs));
	};

	return (
		<div>
			<Typography variant="h2">Login</Typography>
			<br />
			<form onSubmit={handleLogin}>
				<TextField
					label="Email"
					variant="outlined"
					type="email"
					required
					error={inputs.email !== null && inputs.email.trim() === ''}
					helperText={
						inputs.email !== null && inputs.email.trim() === '' ? 'Empty!' : ' '
					}
					value={inputs.email}
					onChange={(e) => {
						setInputs({ ...inputs, email: e.target.value });
					}}
				/>
				<br />
				<TextField
					label="Password"
					variant="outlined"
					type="password"
					required
					error={inputs.password !== null && inputs.password.trim() === ''}
					helperText={
						inputs.password !== null && inputs.password.trim() === ''
							? 'Empty!'
							: ' '
					}
					value={inputs.password}
					onChange={(e) => {
						setInputs({ ...inputs, password: e.target.value });
					}}
				/>
				<br />
				<NavLink activeClassName="active" to="/signup">
					No Account yet? Signup now
				</NavLink>
				<br />
				<br />
				<Button
					type="submit"
					disabled={userLoginLoading}
					variant="contained"
					color="primary"
				>
					{userLoginLoading ? 'Loading...' : 'Login'}
				</Button>
				{loginError ? loginError : ''}
			</form>
		</div>
	);
}

export default Login;
