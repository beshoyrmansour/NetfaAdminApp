import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TAddress } from '../../models/Branches';
import MapLocator from '../MapLocator';


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
    mapWrapper: {
        width: "100%",
        overflow: "hidden",
        height: "649.347px",
        border: "1px solid",
        position: "relative",
        outline: "none",
        padding: theme.spacing(1),
    },
}));


interface Props {
    address: TAddress;
    // setAddress: (TAddress) => TAddress
    setAddress: any;
    mdSize: any;
    mode: UI_FROM_MODE;

}

const AddressForm = (props: Props) => {
    const classes = useStyles();

    const { address, setAddress, mode, mdSize = 6 } = props;

    const [addressTitle, setAddressTitle] = React.useState<string>(address?.addressTitle || '');
    const [buildingNumber, setBuildingNumber] = React.useState<string>(address?.buildingNumber || '');
    const [streetName, setStreetName] = React.useState<string>(address?.streetName || '');
    const [neighbourhood, setNeighbourhood] = React.useState<string>(address?.neighbourhood || '');
    const [state, setState] = React.useState<string>(address?.state || '');
    const [unitNumber, setUnitNumber] = React.useState<string>(address?.unitNumber || '');
    const [floorNumber, setFloorNumber] = React.useState<string>(address?.floorNumber || '');
    const [recipientPhoneNumber, setRecipientPhoneNumber] = React.useState<string>(address?.recipientPhoneNumber || '');
    const [nearestLandMark, setNearestLandMark] = React.useState<string>(address?.nearestLandMark || '');
    const [latitude, setLatitude] = React.useState<number>(address?.latitude || 0);
    const [longitude, setLongitude] = React.useState<number>(address?.longitude || 0);

    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const handleAddressChange = (name: string, value: any) => {
        setAddress((prevAaddress: TAddress) => ({ ...prevAaddress, [name]: value }))
    }

    const handleAddressTitleChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setAddressTitle(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleBuildingNumberChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setBuildingNumber(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleStreetNameChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setStreetName(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleNeighbourhoodChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setNeighbourhood(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleStateChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setState(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleUnitNumberChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setUnitNumber(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleFloorNumberChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setFloorNumber(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleLatitudeChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setLatitude(event.target.value as number);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleLongitudeChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setLongitude(event.target.value as number);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleRecipientPhoneNumberChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setRecipientPhoneNumber(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleNearestLandMarkChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setNearestLandMark(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }

    return (
        <div>
            <Grid direction="row" container
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                <Grid item xs={12} md={mdSize}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="أسم العنوان"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={addressTitle}
                            name="addressTitle"
                            onChange={handleAddressTitleChange}

                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="رقم البناء"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={buildingNumber}
                            name="buildingNumber"
                            onChange={handleBuildingNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم الشارع"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={streetName}
                            name="streetNameber"
                            onChange={handleStreetNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم الحي"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={neighbourhood}
                            name="neighbourhood"
                            onChange={handleNeighbourhoodChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اسم المدينة"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={state}
                            name="statengNumber"
                            onChange={handleStateChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="رقم الوحدة"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={unitNumber}
                            name="unitNumberber"
                            onChange={handleUnitNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="رقم الدور"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={floorNumber}
                            name="floorNumberer"
                            onChange={handleFloorNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="رقم التليفون"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={recipientPhoneNumber}
                            name="recipientPhoneNumber"
                            onChange={handleRecipientPhoneNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="اقرب علامة مميزة"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={nearestLandMark}
                            name="nearestLandMark"
                            onChange={handleNearestLandMarkChange}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={mdSize}>
                    <div className={classes.mapWrapper}>

                        <MapLocator
                            updateLatitude={setLatitude}
                            updateLongitude={setLongitude} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddressForm
