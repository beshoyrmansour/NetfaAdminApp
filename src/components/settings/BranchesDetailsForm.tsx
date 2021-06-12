import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';

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

import { BranchesActionTypes, TAddress, TBranch } from '../../models/Branches';
import { addNewBranch, editBranch, loadBranchesList } from '../../redux/actions/branchActions';
import AddressForm from './AddressForm';

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
    addressTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    paddingRight_1: { paddingRight: theme.spacing(1) },
    saveButton: { marginBottom: theme.spacing(1) },
}));


interface Props {
    open: boolean;
    handleClose: () => void;
    mode: UI_FROM_MODE,
}

const BranchesDetailsForm = (props: Props) => {
    const emptyAddress: TAddress = {
        addressTitle: '',
        buildingNumber: '',
        streetName: '',
        neighbourhood: '',
        state: '',
        unitNumber: '',
        floorNumber: '',
        latitude: 0,
        longitude: 0,
        recipientPhoneNumber: '',
        nearestLandMark: '',
    }
    const classes = useStyles();
    const dispatch = useDispatch();

    const { open, handleClose, mode } = props;
    const selectedBranch = useSelector((state: AppState) => state.settings.selectedBranch as TBranch);

    const [enName, setEnName] = React.useState<string>(selectedBranch.enBranchName || '');
    const [arName, setArName] = React.useState<string>(selectedBranch.arBranchName || '');
    const [address, setAddress] = React.useState<TAddress>(selectedBranch.address || emptyAddress);
    // const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const [isFormValid, setIsFormValid] = React.useState<boolean>(true);
    const [isAddressFormValid, setIsAddressFormValid] = React.useState<boolean>(true);

    const formCleanUpAndClose = () => {
        setEnName('')
        setArName('')
        setAddress(emptyAddress);
        handleClose();
    }

    const handleEnNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEnName(event.target.value as string)
    }
    const handleArNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setArName(event.target.value as string)
    }


    React.useEffect(() => {
        setEnName(selectedBranch?.enBranchName)
        setArName(selectedBranch?.arBranchName)
        setAddress(selectedBranch?.address)
        return () => {

        }
    }, [selectedBranch])

    const handleSubmit = () => {
        setIsFormValid(false);
        dispatch({
            type: BranchesActionTypes.SET_IS_LOADING_BRANCHES,
            payload: true
        });
        switch (mode) {
            case UI_FROM_MODE.NEW:
                addNewBranch(enName, arName, address).then(res => {
                    loadBranchesList(dispatch)
                    formCleanUpAndClose();
                })
                break;
            case UI_FROM_MODE.EDIT:
                editBranch(enName, arName, address, selectedBranch.id as number).then(res => {
                    loadBranchesList(dispatch)
                    formCleanUpAndClose();
                })
                break;

            default:
                break;
        }
    };

    React.useEffect(() => {

        console.log({ useEffectaddress: address });

        setIsFormValid(enName !== '' &&
            isAddressFormValid &&
            arName !== '')

    }, [enName,
        address,
        arName])

    React.useEffect(() => {
        switch (mode) {
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.VIEW:
                setEnName(selectedBranch?.enBranchName || '')
                setArName(selectedBranch?.arBranchName || '')
                setAddress(selectedBranch?.address || emptyAddress);
                break;
            case UI_FROM_MODE.NEW:
                setEnName('')
                setArName('')
                setAddress(emptyAddress);
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
                    <Typography variant="h4">{mode !== UI_FROM_MODE.NEW ? selectedBranch.enBranchName : "إضافة فرع جديد"}</Typography>
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
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم الفرع بالعرية"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={arName}
                            onChange={handleArNameChange}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم الفرع بالإنجليزية"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={enName}
                            onChange={handleEnNameChange}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h5" className={classes.addressTitle}>عنوان الفرع</Typography>
                <AddressForm updateFormValid={setIsAddressFormValid} address={address} setAddress={setAddress} mode={mode} mdSize={6} />
                {/* {mode === UI_FROM_MODE.VIEW && selectedBranch?.products?.length > 0 &&
                    < List >
                    {selectedBranch?.products?.map((product: TProduct) => (
                        <ListItem>
                        <ListItemAvatar>
                        <Avatar variant="square">
                        {product.thumbnailBase64 ? <CardMedia
                            // className={classes.cover}
                            component="img"
                            image={product.thumbnailBase64}
                            title="Main Product Image"
                            /> : <ImageIcon />}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                            </ListItem>
                        ))

                        }
                    </List>
                } */}
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

export default BranchesDetailsForm
