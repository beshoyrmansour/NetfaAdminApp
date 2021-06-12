import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import QuantitiesList from '../components/settings/QuantitiesList'
import CategoriesList from '../components/settings/CategoriesList';
import CategoryDetailsForm from '../components/settings/CategoryDetailsForm';
import QuantityDetailsForm from '../components/settings/QuantityDetailsForm';
import { UI_FROM_MODE } from '../models/configs';
import BranchesList from '../components/settings/BranchesList';
import BranchesDetailsForm from '../components/settings/BranchesDetailsForm';

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
    const [openAddBranch, setOpenAddBranch] = React.useState(false)

    const toggleOpenAddBranch = () => {
        setOpenAddBranch(prev => !prev)
    }

    const toggleOpenAddQuantity = () => {
        setOpenAddQuantity(prev => !prev)
    }

    const toggleOpenAddCategory = () => {
        setOpenAddCategory(prev => !prev)
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                    <Accordion className={classes.paper}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between" width={"100%"}>
                                <Typography variant="h4">
                                    الفروع
                    </Typography>
                                <Tooltip title="إضافة فئة منتجات جديدة">

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        endIcon={<AddIcon />}
                                        onClick={toggleOpenAddBranch}
                                    >
                                        <Typography noWrap> إضافة جديد </Typography>
                                    </Button>
                                </Tooltip>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BranchesList />
                        </AccordionDetails>

                        <BranchesDetailsForm
                            open={openAddBranch}
                            handleClose={() => setOpenAddBranch(false)}
                            mode={UI_FROM_MODE.NEW}
                        />
                    </Accordion>
            </Grid>
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
                                <Typography noWrap> إضافة جديد </Typography>
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
                                <Typography noWrap> إضافة جديد </Typography>
                            </Button>
                        </Tooltip>
                    </Box>
                    <CategoriesList />
                    <QuantityDetailsForm
                        open={openAddQuantity}
                        handleClose={() => setOpenAddQuantity(false)}
                        mode={UI_FROM_MODE.NEW}
                    />
                </Paper>
            </Grid>

        </Grid>
    )
}

export default Settings
