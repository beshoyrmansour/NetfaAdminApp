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
import { addNewEmploye, loadCustomersList, editCustomer } from '../../redux/actions/customersActions';
import { SettingActionTypes } from '../../models/Settings';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';
import { BranchesActionTypes } from '../../models/Branches';
import { loadBranchesList } from '../../redux/actions/branchActions';


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
    branchName: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
}));

interface Props {
    open: boolean;
    handleClose: () => void;
    mode: UI_FROM_MODE,
}

const CustomerForm = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { open, handleClose, mode } = props;
    const selectedCustomer = useSelector((state: AppState) => state.users.selectedCustomer);

    const [email, setEmail] = React.useState<string>(selectedCustomer.email || '');
    const [name, setName] = React.useState<string>(selectedCustomer.name || '');
    const [password, setPassword] = React.useState<string>(selectedCustomer.password || '');
    const [phoneNumber, setPhoneNumber] = React.useState<string>(selectedCustomer.phoneNumber || '');
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const formCleanUpAndClose = () => {
        setEmail("");
        setName("");
        setPassword("");
        setPhoneNumber("");
        handleClose();
    }

    const handleEmailChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEmail(event.target.value as string)
    }
    const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setName(event.target.value as string)
    }
    const handlePasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPassword(event.target.value as string)
    }
    const handlePhoneNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPhoneNumber(event.target.value as string)
    }

    React.useEffect(() => {
        dispatch({
            type: BranchesActionTypes.SET_IS_LOADING_BRANCHES,
            payload: true
        });
        loadBranchesList(dispatch);
    }, []);
    React.useEffect(() => {
        setEmail(selectedCustomer.email);
        setName(selectedCustomer.arName);
        setPhoneNumber(selectedCustomer.phoneNumber);
    }, [selectedCustomer])

    const handleSubmit = () => {
        setIsFormValid(false);
        dispatch({
            type: SettingActionTypes.SET_IS_LOADING_CATEGORIES,
            payload: true
        });
        switch (mode) {
            case UI_FROM_MODE.NEW:
                addNewEmploye({ email, name, password, phoneNumber }).then(res => {
                    loadCustomersList(dispatch);
                    formCleanUpAndClose();
                })
                break;
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.EDIT_PASSWORD:
                editCustomer({ email, name, password, phoneNumber }, selectedCustomer.id).then(res => {
                    loadCustomersList(dispatch);
                    formCleanUpAndClose();
                })
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {


        setIsFormValid(
            email !== '' &&
                mode === UI_FROM_MODE.EDIT_PASSWORD ? (password !== '' &&
                    password.length > 8) : true &&
            name !== '')

    }, [email, name, password])

    React.useEffect(() => {
        switch (mode) {
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.EDIT_PASSWORD:
            case UI_FROM_MODE.VIEW:
                console.log({ selectedCustomer });

                setEmail(selectedCustomer?.email || '');
                setName(selectedCustomer?.name || '');
                setPassword('');
                setPhoneNumber(selectedCustomer?.phoneNumber || '');
                break;
            case UI_FROM_MODE.NEW:
                setEmail("");
                setName("");
                setPassword("");
                setPhoneNumber("");
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
                    <Typography variant="h4">{mode !== UI_FROM_MODE.NEW ? selectedCustomer.name : "إضافة موظف جديد"}</Typography>
                    <div>
                        <IconButton onClick={formCleanUpAndClose}><CloseIcon /></IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <Grid direction="row" container
                    justify="flex-start"
                    alignItems="center" >
                    {(mode === UI_FROM_MODE.EDIT || mode === UI_FROM_MODE.NEW) && <Grid item xs={12} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم الموظف"
                            variant={mode !== UI_FROM_MODE.EDIT ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode !== UI_FROM_MODE.EDIT && mode !== UI_FROM_MODE.NEW,
                            }}
                            type="text"
                            value={name}
                            onChange={handleNameChange}

                        />
                    </Grid>}
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="البريد الإلكترونى"
                            variant={mode !== UI_FROM_MODE.EDIT ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode !== UI_FROM_MODE.EDIT && mode !== UI_FROM_MODE.NEW,
                            }}
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="رقم الهاتف"
                            variant={mode !== UI_FROM_MODE.EDIT ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode !== UI_FROM_MODE.EDIT && mode !== UI_FROM_MODE.NEW,
                            }}
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </Grid>
                    {(mode === UI_FROM_MODE.EDIT_PASSWORD || mode === UI_FROM_MODE.NEW) && < Grid item xs={6}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label={mode === UI_FROM_MODE.EDIT_PASSWORD ? "كلمة المرور الجديدة" : "كلمة المرور"}
                            variant={"standard"}
                            type="passoword"
                            value={password}
                            onChange={handlePasswordChange}
                            helperText="الحد الادني 8 حروف او ارقام"
                        />
                    </Grid>}

                </Grid>
            </DialogContent>
            {
                mode !== UI_FROM_MODE.VIEW && <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={!isFormValid}
                        className={classes.saveButton}
                        fullWidth onClick={handleSubmit}>حفظ</Button>
                </DialogActions>
            }
        </Drawer >
    )
}

export default CustomerForm
