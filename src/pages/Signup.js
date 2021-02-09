import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	TextField,
	IconButton,
	Avatar,
	Button,
	Typography
} from '@material-ui/core/';
import { userSignupService } from './../services';

const Signup = () => {
	const [inputs, setInputs] = useState({
		name: null,
		email: null,
		password: null,
		avatar: null
	});
	const initialStyle = {
		archer: 'inherit',
		witch: 'inherit',
		boxer: 'inherit',
		ninja: 'inherit'
	};
	const [style, setStyle] = useState(initialStyle);

	const history = useHistory();

	const handleSubmit = () => {
		if (!inputs.avatar) {
			setStyle({ error: 'red' });
		} else {
			userSignupService({
				name: inputs.name,
				email: inputs.email,
				password: inputs.password,
				avatar: inputs.avatar
			})
				.then(function (response) {
					if (response.data.data.ok) {
						alert('Please proceed to login');
						history.push('/login');
					}
				})
				.catch((error) => {
					alert(error);
				});
		}
	};

	return (
		<div>
			<Typography variant="h2">Signup</Typography>
			<br />
			<form>
				<TextField
					label="Name"
					variant="outlined"
					type="text"
					required
					value={inputs.name}
					error={inputs.name !== null && inputs.name.trim() === ''}
					helperText={
						inputs.name !== null && inputs.name.trim() === '' ? 'Empty!' : ' '
					}
					onChange={(e) => {
						setInputs({ ...inputs, name: e.target.value });
					}}
				/>
				<br />
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
				<Typography style={{ color: `${style.error}` }}>
					Select a desired avatar:
				</Typography>

				<IconButton
					style={{ backgroundColor: style.archer }}
					onClick={(e) => {
						setInputs({ ...inputs, avatar: 'archer' });
						setStyle({
							...initialStyle,
							archer: '#0000000a'
						});
					}}
				>
					<Avatar
						src="/images/archer.jpg"
						style={{
							margin: '10px',
							width: '60px',
							height: '60px'
						}}
					/>
				</IconButton>
				<IconButton
					style={{ backgroundColor: style.witch }}
					onClick={(e) => {
						setInputs({ ...inputs, avatar: 'witch' });
						setStyle({
							...initialStyle,
							witch: '#0000000a'
						});
					}}
				>
					<Avatar
						src="/images/witch.jpg"
						style={{
							margin: '10px',
							width: '60px',
							height: '60px'
						}}
					/>
				</IconButton>
				<IconButton
					style={{ backgroundColor: style.boxer }}
					onClick={(e) => {
						setInputs({ ...inputs, avatar: 'boxer' });
						setStyle({
							...initialStyle,
							boxer: '#0000000a'
						});
					}}
				>
					<Avatar
						src="/images/boxer.jpg"
						style={{
							margin: '10px',
							width: '60px',
							height: '60px'
						}}
					/>
				</IconButton>
				<IconButton
					style={{ backgroundColor: style.ninja }}
					onClick={(e) => {
						setInputs({ ...inputs, avatar: 'ninja' });
						setStyle({
							...initialStyle,
							ninja: '#0000000a'
						});
					}}
				>
					<Avatar
						src="/images/ninja.jpg"
						style={{
							margin: '10px',
							width: '60px',
							height: '60px'
						}}
					/>
				</IconButton>
				<br />
				<Button variant="contained" onClick={handleSubmit} color="primary">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Signup;
