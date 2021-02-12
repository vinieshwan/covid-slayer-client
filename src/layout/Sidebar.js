import { Box, Avatar, Button, Divider } from '@material-ui/core/';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
	return (
		<Box
			style={{
				height: '100vh',
				width: '10vh',
				padding: '10px',
				backgroundColor: '#1D2738'
			}}
		>
			<NavLink to="/">
				<Avatar
					src={`/images/${props.avatar}.jpg`}
					style={{
						width: '46px',
						height: '46px'
					}}
				/>
			</NavLink>
			<br />
			<Divider />
			<br />
			<br />
			<NavLink
				style={{ marginLeft: '-8px' }}
				component={Button}
				to="/account-settings"
			>
				<AccountCircleIcon />
			</NavLink>
			<br />
			<br />
			<NavLink
				style={{ marginLeft: '-8px' }}
				component={Button}
				to="/game-settings"
			>
				<SettingsIcon />
			</NavLink>
		</Box>
	);
};

export default Sidebar;
