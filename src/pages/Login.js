import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Box } from '@material-ui/core/';

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
			<Box display="flex">
				<Box>
					<NavLink activeClassName="activeLink" to="/">
						<Typography
							variant="h6"
							style={{
								fontFamily: ['Noto Sans SC', 'sans-serif'],
								fontWeight: '900'
							}}
						>
							Login
						</Typography>
					</NavLink>
				</Box>
				<Box px={2}>
					<Typography
						variant="h6"
						style={{
							fontFamily: ['Noto Sans SC', 'sans-serif'],
							fontWeight: '900'
						}}
					>
						|
					</Typography>
				</Box>
				<Box>
					<NavLink to="/signup">
						<Typography
							variant="h6"
							style={{
								fontFamily: ['Noto Sans SC', 'sans-serif'],
								fontWeight: '900'
							}}
						>
							Signup
						</Typography>
					</NavLink>
				</Box>
			</Box>
			<br />
			<Box display="flex" pt={5}>
				<Box py={2} style={{ width: '50%' }}>
					<form
						style={{ border: '1px solid #fff', padding: '3em 2em' }}
						onSubmit={handleLogin}
					>
						<TextField
							label="Email"
							variant="outlined"
							type="email"
							required
							error={inputs.email !== null && inputs.email.trim() === ''}
							helperText={
								inputs.email !== null && inputs.email.trim() === ''
									? 'Empty!'
									: ' '
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
						<br />
						<Button
							type="submit"
							disabled={userLoginLoading}
							variant="contained"
							color="secondary"
						>
							{userLoginLoading ? 'Loading...' : 'Login'}
						</Button>
						{loginError ? loginError : ''}
					</form>
				</Box>
				<Box py={2} style={{ textAlign: 'center', width: '50%' }}>
					<Typography
						variant="h1"
						style={{
							fontFamily: ['Noto Sans SC', 'sans-serif'],
							fontWeight: '900'
						}}
					>
						Let's
						<br />
						play!
					</Typography>
				</Box>
			</Box>
		</div>
	);
}

export default Login;
