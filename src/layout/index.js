import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	overrides: {
		MuiCard: {
			root: {
				marginTop: '20px',
				height: '93vh',
				borderRadius: 10,
				background: '#131B29',
				boxShadow: '1px 20px 30px 5px rgba(30,30,30, 0.3) !important'
			}
		},
		MuiTypography: {
			root: {
				color: '#fff !important'
			}
		},
		MuiDataGrid: {
			root: {
				backgroundColor: '#ffffff',
				borderRadius: '5px !important',
				border: '1px solid #ffffff !important',
				boxShadow: 'none !important'
			}
		},
		MuiFormControl: {
			root: {
				width: '100%'
			}
		},
		MuiOutlinedInput: {
			notchedOutline: {
				borderColor: '#fff'
			}
		},
		MuiInputLabel: {
			outlined: {
				color: '#fff'
			}
		},
		MuiDivider: {
			root: {
				backgroundColor: '#fff'
			}
		}
	},
	palette: {
		background: {
			default: '#293346'
		},
		text: {
			primary: '#fff'
		},
		primary: {
			main: '#fff'
		},
		secondary: {
			main: '#d8113a'
		}
	}
});

export default theme;
