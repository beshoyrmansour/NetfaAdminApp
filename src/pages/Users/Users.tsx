import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Employees from './Employees';
import Customers from './Customers';

const useStyles = makeStyles((theme: Theme) => ({
    toggleContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    toggleButton: {
        color: 'black',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),

        '&[aria-pressed="true"]': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
        }
    }
}));

interface Props {

}

const Users = (props: Props) => {
    const classes = useStyles();

    const [currentActiveOption, setCurrentActiveOption] = React.useState('Employees');
    const handleChangeCurrentActiveOption = (event: React.MouseEvent<HTMLElement>, newActiveOption: string | null) => {
        if (newActiveOption !== null) {
            setCurrentActiveOption(newActiveOption);
        }
    };

    const rederActiveComponent: () => JSX.Element = () => {
        switch (currentActiveOption) {
            case 'Employees':
                return <Employees />;
            case 'Customers':
                return <Customers />;
            // case 'Categories':
            //     return <Categories />;

            default: return <Employees />;

        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item sm={12} md={12}>
                <ToggleButtonGroup
                    className={classes.toggleContainer}
                    value={currentActiveOption}
                    exclusive
                    onChange={handleChangeCurrentActiveOption}
                    aria-label="text alignment"
                    size="small"
                >
                    <ToggleButton value="Customers" aria-label="Customers" className={classes.toggleButton}>
                        العملاء
                        </ToggleButton>
                    <ToggleButton value="Employees" aria-label="Employees" className={classes.toggleButton}>
                        الموظفين
                       </ToggleButton>
                    {/* <ToggleButton value="Categories" aria-label="Employees" className={classes.toggleButton}>
                        الفئات المنتجات
                        </ToggleButton> */}

                </ToggleButtonGroup>
            </Grid>
            <Grid item sm={12} md={12}>
                {rederActiveComponent()}
            </Grid>
        </Grid>
    )
}

export default Users
