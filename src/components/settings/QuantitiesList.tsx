import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { TQuantity } from '../../models/Quantity';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { deleteQuantity, getQuantitiesList } from '../../redux/actions/settingActions';
import { AxiosResponse } from 'axios';
import { SettingActionTypes } from '../../models/Settings';
import LoadingIndicator from '../LoadingIndicator';
import ConfirmDialog from '../ConfirmDialog';
import QuantityDetailsForm from './QuantityDetailsForm';
import { UI_FROM_MODE } from '../../models/configs';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            //   maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        valueLarge: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            marginRight: theme.spacing(2),
            backgroundColor: theme.palette.primary.dark,
        },
    }),
);

interface Props {

}

const QuantitiesList = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [selectedQuantity, setSelectedQuantity] = React.useState<TQuantity | null>(null);
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });
    const [openForm, setOpenForm] = React.useState<boolean>(false);
    const [formMode, setFormMode] = React.useState<UI_FROM_MODE>(UI_FROM_MODE.VIEW);

    const quantities = useSelector((state: AppState) => state.settings.quantities);
    const isLoadingQuantities = useSelector((state: AppState) => state.settings.isLoadingQuantities);

    const loadQuantitiesList: () => void = () => {
        getQuantitiesList().then((res: AxiosResponse) => {
            console.log({
                payloadRes: res
            });

            if (res.status === 200) {
                dispatch({
                    type: SettingActionTypes.FETCH_ALL_QUANTITIES,
                    payload: res.data
                })
            }
        })
    }
    React.useEffect(() => {
        dispatch({
            type: SettingActionTypes.SET_IS_LOADING_QUANTITIES,
            payload: true
        });
        loadQuantitiesList();
    }, [])

    const handleDeleteQuantity: (quantity: TQuantity) => void = (quantity) => {
        console.log({ quantity });
        setSelectedQuantity(selectedQuantity);
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد حذف الكمية الإفتراضية "${quantity.arName}"`);
        setConfirmDialogSubmit('حذف');
        setOpenConfirmDialog(true);
        const _deleteQuantity: () => void = () => {
            console.log({ handleDeleteQuantity_OnSubmit: quantity });
            dispatch({
                type: SettingActionTypes.SET_IS_LOADING_QUANTITIES,
                payload: true
            });
            deleteQuantity(quantity).then(() => {
                loadQuantitiesList();
                setOpenConfirmDialog(false);
                setConfirmDialogTitle('');
                setConfirmDialogMessage('');
                setConfirmDialogSubmit('');
            })
        }
        setOnSubmit((prev) => _deleteQuantity)
    }

    const handleEditQuantity: (quantity: TQuantity) => void = (quantity) => {
        setFormMode(UI_FROM_MODE.EDIT)
        setOpenForm(true);
        dispatch({
            type: SettingActionTypes.SET_SELECTED_QUANTITY,
            payload: quantity
        })
    }

    const handleViewQuantity: (quantity: TQuantity) => void = (quantity) => {
        setFormMode(UI_FROM_MODE.VIEW)
        setOpenForm(true);
        dispatch({
            type: SettingActionTypes.SET_SELECTED_QUANTITY,
            payload: quantity
        })
    }

    const handleConfirmDialogCancel: () => void = () => {
        console.log({ handleConfirmDialogCancel: selectedQuantity });
        setOpenConfirmDialog(false);
    }

    return (
        <>
            {isLoadingQuantities ? <LoadingIndicator width="100%" height="400px" /> : (<List className={classes.root}>
                {quantities.length ? quantities.map((quantity: TQuantity) => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar variant="rounded" className={classes.valueLarge}>
                                {quantity.value}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={quantity.arName} secondary={quantity.enName} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleEditQuantity(quantity)}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton edge="end" aria-label="Visibility" onClick={() => handleDeleteQuantity(quantity)}>
                                <DeleteIcon color="primary" />
                            </IconButton>
                            <IconButton edge="end" aria-label="Edit" onClick={() => handleViewQuantity(quantity)}>
                                <ChevronLeftIcon color="secondary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )) :
                    <Typography variant="h5" color="textSecondary"
                        style={{ width: "100%", height: "400px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>لا يوجد كميات الافتراضية</Typography>}
            </List>)}
            <ConfirmDialog
                title={confirmDialogTitle}
                message={confirmDialogMessage}
                sumbit={confirmDialogSubmit}
                onCancel={handleConfirmDialogCancel}
                onSubmit={onSubmit}
                open={openConfirmDialog}
            />
            <QuantityDetailsForm
                open={openForm}
                handleClose={() => { setOpenForm(false) }}
                mode={formMode} />
        </>
    )
}

export default QuantitiesList
