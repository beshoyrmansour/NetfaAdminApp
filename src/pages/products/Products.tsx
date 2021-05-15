import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BundlesProducts from './BundlesProducts';
import SingleOrderItemsProducts from './SingleOrderItemsProducts';
import Categories from '../categories/Categories';



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

const Products = (props: Props) => {
    const classes = useStyles();

    const [currentActiveOption, setCurrentActiveOption] = React.useState('SingleOrderItemsProducts');
    const handleChangeCurrentActiveOption = (event: React.MouseEvent<HTMLElement>, newActiveOption: string | null) => {
        if (newActiveOption !== null) {
            setCurrentActiveOption(newActiveOption);
        }
    };

    const rederActiveComponent: () => JSX.Element = () => {
        switch (currentActiveOption) {
            case 'SingleOrderItemsProducts':
                return <SingleOrderItemsProducts />;
            case 'BundlesProducts':
                return <BundlesProducts />;
            case 'Categories':
                return <Categories />;

            default: return <SingleOrderItemsProducts />;

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
                    <ToggleButton value="SingleOrderItemsProducts" aria-label="SingleOrderItemsProducts" className={classes.toggleButton}>
                        المنتجات الفردية
                        </ToggleButton>
                    <ToggleButton value="BundlesProducts" aria-label="BundlesProducts" className={classes.toggleButton}>
                        مجموعات المنتجات
                        </ToggleButton>
                    <ToggleButton value="Categories" aria-label="BundlesProducts" className={classes.toggleButton}>
                        الفئات المنتجات
                        </ToggleButton>

                </ToggleButtonGroup>
            </Grid>
            <Grid item sm={12} md={12}>
                {rederActiveComponent()}
            </Grid>
        </Grid>
    )
}

export default Products
