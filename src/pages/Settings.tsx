import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import QuantitiesList from '../components/settings/QuantitiesList'
import CategoriesList from '../components/settings/CategoriesList';
import CategoryDetailsForm from '../components/settings/CategoryDetailsForm';
import QuantityDetailsForm from '../components/settings/QuantityDetailsForm';
import { UI_FROM_MODE } from '../models/configs';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
        },
        addNewButton: {
            justifySelf: 'flex-end',
        }
    }),
);

interface Props {

}

const Settings = (props: Props) => {
    const classes = useStyles();
    const [openAddQuantity, setOpenAddQuantity] = React.useState(false)
    const [openAddCategory, setOpenAddCategory] = React.useState(false)


    const toggleOpenAddQuantity = () => {
        setOpenAddQuantity(prev => !prev)
    }

    const toggleOpenAddCategory = () => {
        setOpenAddCategory(prev => !prev)
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                <Paper className={classes.paper}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width={"100%"}>
                        <Typography variant="h4">الكميات الافتراضية
                    </Typography>
                        <Tooltip title="إضافة كميةافتراضية جديدة">
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<AddIcon />}
                                onClick={toggleOpenAddQuantity}
                            >
                                <Typography noWrap>
                                    إضافة جديد
                    </Typography>
                            </Button>
                        </Tooltip>
                    </Box>
                    <QuantitiesList />
                    <CategoryDetailsForm
                        open={openAddCategory}
                        handleClose={() => setOpenAddCategory(false)}
                        mode={UI_FROM_MODE.NEW}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Paper className={classes.paper}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width={"100%"}>
                        <Typography variant="h4">
                            فئات المنتجات
                    </Typography>
                        <Tooltip title="إضافة فئة منتجات جديدة">

                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<AddIcon />}
                                onClick={toggleOpenAddCategory}
                            >
                                <Typography noWrap>
                                    إضافة جديد
                    </Typography>
                            </Button>
                        </Tooltip>
                    </Box>
                    <CategoriesList />
                    <QuantityDetailsForm
                        open={openAddQuantity}
                        handleClose={() => setOpenAddQuantity(false)}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Settings
