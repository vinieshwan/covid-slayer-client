import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Avatar,
	Typography,
	Box,
	Button,
	IconButton,
	TextField
} from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { getUser, updateUser } from './../services';

const Account = () => {
	const history = useHistory();
	const authObj = useSelector((state) => state.auth);

	const { avatar } = authObj;

	const initialStyle = {
		archer: avatar === 'archer' ? '#0000000a' : 'inherit',
		witch: avatar === 'witch' ? '#0000000a' : 'inherit',
		boxer: avatar === 'boxer' ? '#0000000a' : 'inherit',
		ninja: avatar === 'ninja' ? '#0000000a' : 'inherit'
	};

	const [inputs, setInputs] = useState({});
	const [style, setStyle] = useState(initialStyle);
	const [user, setUser] = useState({});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const result = await updateUser(inputs);

		if (result.error) {
			alert(result.message);
			return;
		}

		alert('Successfully updated!');
		history.push('/dashboard');
	};

	useEffect(async () => {
		const result = await getUser();

		if (result.error) {
			alert(result.message);

			return;
		}
		setUser(result.data.data.user);
	}, []);

	return (
		<div style={{ width: '100%' }}>
			<Box display="flex" p={1}>
				<Box p={2} flexGrow={1}>
					<Typography variant="h3">Account Settings</Typography>
				</Box>
			</Box>
			<form onSubmit={handleSubmit}>
				<TextField
					label={`Name: ${user.name}`}
					variant="outlined"
					type="text"
					value={inputs.name ? inputs.name : ''}
					error={inputs.name && inputs.name.trim() === ''}
					helperText={inputs.name && inputs.name.trim() === '' ? 'Empty!' : ' '}
					onChange={(e) => {
						setInputs({ ...inputs, name: e.target.value });
					}}
				/>
				<br />
				<TextField
					label={`Email: ${user.email}`}
					variant="outlined"
					type="email"
					value={inputs.email ? inputs.email : ''}
					error={inputs.email && inputs.email.trim() === ''}
					helperText={
						inputs.email && inputs.email.trim() === '' ? 'Empty!' : ' '
					}
					value={inputs.email}
					onChange={(e) => {
						setInputs({ ...inputs, email: e.target.value });
					}}
				/>
				<br />
				<TextField
					label={`Password: ***`}
					variant="outlined"
					type="email"
					value={inputs.password ? inputs.password : ''}
					error={inputs.password && inputs.password.trim() === ''}
					helperText={
						inputs.password && inputs.password.trim() === '' ? 'Empty!' : ' '
					}
					value={inputs.password}
					onChange={(e) => {
						setInputs({ ...inputs, password: e.target.value });
					}}
				/>
				<br />
				<Typography style={{ color: `${style.error}` }}>
					Update your desired avatar:
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
				<Button type="submit" variant="contained" color="secondary">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Account;
