import { Typography, Link, Box, Button } from '@material-ui/core';
import DonutSmallTwoToneIcon from '@material-ui/icons/DonutSmallTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutRequest } from './../actions';

const Header = () => {
	const authObj = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { isAuthenticated } = authObj;

	const handleLogout = () => {
		dispatch(userLogoutRequest());
	};

	return (
		<div>
			<Link href="/" style={{ textDecoration: 'none' }}>
				<Box p2={5} display="flex">
					<Box>
						<DonutSmallTwoToneIcon
							style={{
								width: '3em',
								height: '3em',
								color: '#D8113A'
							}}
						/>
					</Box>
					<Box pt={2} flexGrow={1}>
						<Typography
							variant="h6"
							style={{
								fontFamily: ['Noto Sans SC', 'sans-serif'],
								fontWeight: '900',
								color: '#fff'
							}}
						>
							ovid
						</Typography>
						<Typography
							variant="h6"
							style={{
								fontFamily: ['Noto Sans SC', 'sans-serif'],
								fontWeight: '900',
								marginLeft: '1em',
								lineHeight: '.8em'
							}}
						>
							<s style={{ color: '#D8113A' }}>
								<span style={{ color: '#fff' }}>Slayer</span>
							</s>
						</Typography>
					</Box>
					{isAuthenticated ? (
						<Box p={2}>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleLogout}
							>
								Logout{' '}
							</Button>
						</Box>
					) : (
						''
					)}
				</Box>
			</Link>
		</div>
	);
};

export default Header;
