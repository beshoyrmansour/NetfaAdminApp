import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SettingActionTypes } from '../../models/Settings';
import { addNewQuantity, editQuantity, loadQuantitiesList } from '../../redux/actions/settingActions';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';


const useStyles = makeStyles((theme: Theme) => ({
    title: {
        display: 'flex',
        marginTop: '1.2rem',
        marginBottom: '1.6rem',
        justifyContent: 'space-between',
    },

    textField: {
        marginBottom: '1.2rem'
    },
    paddingRight_1: { paddingRight: theme.spacing(1) },
    saveButton: { marginBottom: theme.spacing(1) },
}));

interface Props {
    open: boolean;
    handleClose: () => void;
    mode: UI_FROM_MODE,
}

const QuantityDetailsForm = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        open,
        handleClose,
        mode
    } = props;

    const selectedQuantity = useSelector((state: AppState) => state.settings.selectedQuantity);

    const [enName, setEnName] = React.useState<string>('');
    const [arName, setArName] = React.useState<string>('');
    const [value, setValue] = React.useState<number | undefined>(undefined);
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const formCleanUpAndClose = () => {
        setEnName("");
        setArName("");
        setValue(undefined);
        handleClose();
    }
    const handleEnNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEnName(event.target.value as string)
    }
    const handleArNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setArName(event.target.value as string)
    }
    const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const rx_live = /^[+-]?\d*(?:[.]\d*)?$/;
        if (rx_live.test(event.target.value as string))
            setValue(event.target.value as number || 1)
    }

    React.useEffect(() => {
        setEnName(selectedQuantity.enName)
        setArName(selectedQuantity.arName)
        setValue(selectedQuantity.value)
    }, [selectedQuantity])

    const handleSubmit = () => {
        dispatch({
            type: SettingActionTypes.SET_IS_LOADING_QUANTITIES,
            payload: true
        });
        switch (mode) {
            case UI_FROM_MODE.NEW:
                addNewQuantity(enName, arName, value as number).then(res => {
                    loadQuantitiesList(dispatch);
                    formCleanUpAndClose();
                });
                break;
            case UI_FROM_MODE.EDIT:
                editQuantity(enName, arName, value as number, selectedQuantity.id).then(res => {
                    loadQuantitiesList(dispatch);
                    formCleanUpAndClose();
                })
                break;

            default:
                break;
        }
    };

    React.useEffect(() => {
        setIsFormValid(enName !== '' &&
            value !== undefined &&
            arName !== '');
    }, [enName,
        value,
        arName]);

    React.useEffect(() => {
        switch (mode) {
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.VIEW:
                setEnName(selectedQuantity?.enName || '');
                setArName(selectedQuantity?.arName || '');
                setValue(selectedQuantity?.value || undefined);
                break;
            case UI_FROM_MODE.NEW:
                setEnName("");
                setArName("");
                setValue(undefined);
                break;
            default:
                break;
        }
    }, [mode])

    return (
        <Drawer
            variant="temporary"
            open={open}
            anchor="right"

        >
            <DialogTitle id="alert-dialog-title">
                <div className={classes.title}>
                    <Typography variant="h4">إضافة كميةافتراضية جديدة</Typography>
                    <IconButton onClick={formCleanUpAndClose}><CloseIcon /></IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Grid direction="row" container
                    justify="flex-start"
                    alignItems="center" >
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم الوحدة بالعرية"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            type="number"
                            value={arName}
                            onChange={handleArNameChange}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم الوحدة بالإنجليزية"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            type="number"
                            value={enName}
                            onChange={handleEnNameChange}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="القيمة"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            type="number"
                            value={value}
                            onChange={handleValueChange}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                        />

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" disabled={!isFormValid} className={classes.saveButton} fullWidth onClick={handleSubmit}>حفظ</Button>

            </DialogActions>
        </Drawer>
    )
}

export default QuantityDetailsForm
