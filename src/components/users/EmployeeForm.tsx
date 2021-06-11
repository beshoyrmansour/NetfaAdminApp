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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { SettingActionTypes } from '../../models/Settings';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';
import { addNewEmploye, loadEmployeesList, editEmployee } from '../../redux/actions/employeesActions';
import { BranchesActionTypes, TBranch } from '../../models/Branches';
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

const EmployeeForm = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { open, handleClose, mode } = props;
    const selectedEmployee = useSelector((state: AppState) => state.users.selectedEmployee);
    const isLoadingSelectedEmployee = useSelector((state: AppState) => state.users.isLoadingSelectedEmployee);
    const branches = useSelector((state: AppState) => state.settings.branches);
    const isLoadingBranches = useSelector((state: AppState) => state.settings.isLoadingBranches);

    const [email, setEmail] = React.useState<string>(selectedEmployee.email || '');
    const [name, setName] = React.useState<string>(selectedEmployee.name || '');
    const [password, setPassword] = React.useState<string>(selectedEmployee.password || '');
    const [phoneNumber, setPhoneNumber] = React.useState<string>(selectedEmployee.phoneNumber || '');
    const [employmentBranchId, setEmploymentBranchId] = React.useState<number | undefined>(selectedEmployee.employmentBranchId || undefined);
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const formCleanUpAndClose = () => {
        setEmail("");
        setName("");
        setPassword("");
        setPhoneNumber("");
        setEmploymentBranchId(undefined);
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
    const handleEmploymentBranchIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEmploymentBranchId(event.target.value as number)
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
        setEmail(selectedEmployee.email);
        setName(selectedEmployee.arName);
        setPhoneNumber(selectedEmployee.phoneNumber);
        setEmploymentBranchId(selectedEmployee.employmentBranchId);
    }, [selectedEmployee])

    const handleSubmit = () => {
        setIsFormValid(false);
        dispatch({
            type: SettingActionTypes.SET_IS_LOADING_CATEGORIES,
            payload: true
        });
        switch (mode) {
            case UI_FROM_MODE.NEW:
                addNewEmploye({ email, name, password, phoneNumber, employmentBranchId }).then(res => {
                    loadEmployeesList(dispatch);
                    formCleanUpAndClose();
                })
                break;
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.EDIT_PASSWORD:
                editEmployee({ email, name, password, phoneNumber, employmentBranchId }, selectedEmployee.id).then(res => {
                    loadEmployeesList(dispatch);
                    formCleanUpAndClose();
                })
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {
        console.log({
            email,
            password,
            employmentBranchId,
            name,

            flag_email: email !== '',
            flag_password: password !== '',
            flag_employmentBranchId: employmentBranchId !== undefined,
            flag_employmentBranchId_length: password.length > 8,
            flag_name: name !== '',
        });

        setIsFormValid(
            email !== '' &&
            password !== '' &&
            password.length > 8 &&
            employmentBranchId !== undefined &&
            name !== '')

    }, [email, name, password, employmentBranchId])

    React.useEffect(() => {
        switch (mode) {
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.EDIT_PASSWORD:
            case UI_FROM_MODE.VIEW:
                console.log({ selectedEmployee });

                setEmail(selectedEmployee?.email || '');
                setName(selectedEmployee?.name || '');
                setPassword('');
                setPhoneNumber(selectedEmployee?.phoneNumber || '');
                setEmploymentBranchId(selectedEmployee?.employmentBranchId || '');
                break;
            case UI_FROM_MODE.NEW:
                setEmail("");
                setName("");
                setPassword("");
                setPhoneNumber("");
                setEmploymentBranchId(undefined);
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
                    <Typography variant="h4">{mode !== UI_FROM_MODE.NEW ? selectedEmployee.name : "إضافة موظف جديد"}</Typography>
                    <div>
                        {/* {mode === UI_FROM_MODE.VIEW && <IconButton onClick={() => changeMode(UI_FROM_MODE.EDIT)}><EditIcon color="primary" /></IconButton>} */}
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
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        {(mode === UI_FROM_MODE.EDIT || mode === UI_FROM_MODE.NEW) ?
                            <FormControl
                                variant={mode !== UI_FROM_MODE.EDIT ? "outlined" : "outlined"}
                                disabled={isLoadingBranches || mode !== UI_FROM_MODE.EDIT && mode !== UI_FROM_MODE.NEW}
                                fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">الفرع التابع له</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={employmentBranchId}
                                    onChange={handleEmploymentBranchIdChange}
                                    label="CategoryId"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {branches.map((branch: TBranch) => (
                                        <MenuItem key={branch.id} value={branch.id}>{branch?.arBranchName}</MenuItem>

                                    ))}
                                </Select>
                            </FormControl>
                            :
                            <>{(!isLoadingBranches && branches.length > 0) && branches.map((branch: TBranch) => (employmentBranchId == branch.id && (
                                <TextField
                                    className={classes.textField}
                                    required
                                    multiline
                                    fullWidth
                                    id="outlined-required"
                                    label="الفرع التابع له"
                                    variant={"outlined"}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    type="text"
                                    value={branch.arBranchName}
                                />
                                // <Typography className={classes.branchName} variant="body1" component="h2"> {branch.arBranchName}</Typography >
                            )))}</>
                        }

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
                            // variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            // InputProps={{
                            //     readOnly: mode === UI_FROM_MODE.VIEW,
                            // }}
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

export default EmployeeForm
