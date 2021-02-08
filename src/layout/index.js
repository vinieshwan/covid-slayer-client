import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	overrides: {
		MuiCard: {
			root: {
				padding: '5px',
				marginTop: '20px',
				borderRadius: 5,
				border: '1px solid #0a0a0a !important'
			}
		},
		MuiPaper: {
			root: {
				backgroundColor: '#ffffff',
				borderRadius: '5px !important',
				border: '1px solid #ffffff !important',
				boxShadow: 'none !important'
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
		// MuiSvgIcon: {
		// 	root: {
		// 		color: ''
		// 	}
		// },
		MuiFormControl: {
			root: {
				width: '50%'
			}
		},
		MuiButtonBase: {
			root: {
				backgroundColor: '#f0f0f0',
				border: '1px solid #fff'
			}
		}
	},
	palette: {
		background: {
			default: '#fefefe'
		}
	}
});

export default theme;
