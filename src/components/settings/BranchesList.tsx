import React from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import ConfirmDialog from '../../components/ConfirmDialog';
import { BranchesActionTypes, TBranch } from '../../models/Branches';
import { deleteBranch, loadBranchesList } from '../../redux/actions/branchActions';
import BranchesDetailsForm from './BranchesDetailsForm';
import TableContainer from '@material-ui/core/TableContainer/TableContainer';

const useStyles = makeStyles((theme: Theme) => createStyles({

    table: {
        minWidth: 650,
        marginBottom: theme.spacing(3)
    },
    noItemsText: {
        width: "100%",
        height: "400px",
    },
}),
);



const BranchesList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedBranch, setSelectedBranch] = React.useState<TBranch | null>(null);
    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });
    const [openForm, setOpenForm] = React.useState<boolean>(false);
    const [formMode, setFormMode] = React.useState<UI_FROM_MODE>(UI_FROM_MODE.VIEW);
    const branches = useSelector((state: AppState) => state.settings.branches);
    const isLoadingBranches = useSelector((state: AppState) => state.settings.isLoadingBranches);

    const toggleOpenBranchDetails = () => {
        setOpenForm((prevForm) => !prevForm)
    }



    React.useEffect(() => {
        dispatch({
            type: BranchesActionTypes.SET_IS_LOADING_BRANCHES,
            payload: true
        });
        loadBranchesList(dispatch);
    }, []);

    const handleEditCategory: (branch: TBranch) => void = (branch) => {
        setFormMode(UI_FROM_MODE.EDIT)
        setOpenForm(true);
        dispatch({
            type: BranchesActionTypes.SET_SELECTED_BRANCH,
            payload: branch
        })
    }

    const handleDeleteBranch: (branch: TBranch) => void = (branch) => {
        setSelectedBranch(selectedBranch);
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد حذف الفرع "${branch.arBranchName}"`);
        setConfirmDialogSubmit('حذف');
        setOpenConfirmDialog(true);
        const _deleteBranch: () => void = () => {
            dispatch({
                type: BranchesActionTypes.SET_IS_LOADING_BRANCHES,
                payload: true
            });
            deleteBranch(branch.id as number).then(() => {
                loadBranchesList(dispatch);
                setOpenConfirmDialog(false);
                setConfirmDialogTitle('');
                setConfirmDialogMessage('');
                setConfirmDialogSubmit('');
            })
        }
        setOnSubmit((prev) => _deleteBranch)
    }

    const handleViewBranch: (branch: TBranch) => void = (branch) => {
        setFormMode(UI_FROM_MODE.VIEW)
        setOpenForm(true);
        dispatch({
            type: BranchesActionTypes.SET_SELECTED_BRANCH,
            payload: branch
        })

    }
    const handleConfirmDialogCancel: () => void = () => {
        setOpenConfirmDialog(false);
    }
    const handleOpenBranchesDetailsFormOnClick = (branch: TBranch, mode: UI_FROM_MODE) => {
        dispatch({
            type: BranchesActionTypes.SET_SELECTED_BRANCH,
            payload: branch
        })
        setFormMode(mode)
        toggleOpenBranchDetails()
    };
    return (
        <>
            {isLoadingBranches ? (<LoadingIndicator width="100%" height="400px" />)
                : (branches.length > 0 ? <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>الإسم</TableCell>
                                <TableCell>المدينة</TableCell>
                                <TableCell>الحي</TableCell>
                                <TableCell>الشارع</TableCell>
                                <TableCell padding="checkbox" align="center" variant="head">التحكم</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {branches.map((row: TBranch) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.arBranchName}
                                    </TableCell>
                                    <TableCell>{row.address.state}</TableCell>
                                    <TableCell>{row.address.neighbourhood}</TableCell>
                                    <TableCell>{row.address.streetName}</TableCell>
                                    <TableCell align="center">
                                        <Box display="flex">
                                            <Tooltip title="تعديل">
                                                <IconButton aria-label="تعديل" onClick={() => handleOpenBranchesDetailsFormOnClick(row, UI_FROM_MODE.EDIT)} >
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="حذف">
                                                <IconButton aria-label="حذف" onClick={() => handleDeleteBranch(row)}>
                                                    <DeleteIcon color="primary" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="عرض التفاصيل" onClick={() => handleOpenBranchesDetailsFormOnClick(row, UI_FROM_MODE.VIEW)} >
                                                <IconButton aria-label="عرض التفاصيل">
                                                    <ChevronLeftIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    : (<Box className={classes.noItemsText} display="flex" justifyContent="center" alignItems="center">
                        <Typography>لا يوجد فروع</Typography>
                    </Box>)

                )}
            <ConfirmDialog
                title={confirmDialogTitle}
                message={confirmDialogMessage}
                sumbit={confirmDialogSubmit}
                onCancel={handleConfirmDialogCancel}
                onSubmit={onSubmit}
                open={openConfirmDialog}
            />
            <BranchesDetailsForm
                open={openForm}
                handleClose={() => { setOpenForm(false) }}
                mode={formMode} />
        </>
    )
}

export default BranchesList;