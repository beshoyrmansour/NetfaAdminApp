import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        type: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#e6b42b',
        },
    },
    typography: {
        fontFamily: '"Cairo", sans-serif',
    }
});

export default theme;
