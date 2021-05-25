import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { UI_FROM_MODE } from '../../models/configs';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
        height: "440px",
        border: "1px solid",
        padding: theme.spacing(1),
        borderRadius: "4px",
    },
}));


interface Props {
    address: TAddress;
    // setAddress: (TAddress) => TAddress
    setAddress: any;
    mdSize: any;
    updateFormValid: any;
    mode: UI_FROM_MODE;

}

const AddressForm = (props: Props) => {
    const classes = useStyles();

    const { address, setAddress, mode, mdSize = 6, updateFormValid } = props;

    const [addressTitle, setAddressTitle] = React.useState<string>(address?.addressTitle || '');
    const [buildingNumber, setBuildingNumber] = React.useState<string>(address?.buildingNumber || '');
    const [streetName, setStreetName] = React.useState<string>(address?.streetName || '');
    const [neighbourhood, setNeighbourhood] = React.useState<string>(address?.neighbourhood || '');
    const [state, setState] = React.useState<string>(address?.state || '');
    const [unitNumber, setUnitNumber] = React.useState<string>(address?.unitNumber || '');
    const [floorNumber, setFloorNumber] = React.useState<string>(address?.floorNumber || '');
    const [recipientPhoneNumber, setRecipientPhoneNumber] = React.useState<string>(address?.recipientPhoneNumber || '');
    const [nearestLandMark, setNearestLandMark] = React.useState<string>(address?.nearestLandMark || '');
    const [latitude, setLatitude] = React.useState<number>(address?.latitude || 21.6274891);
    const [longitude, setLongitude] = React.useState<number>(address?.longitude || 39.1396403);
    const [gMapsLink, setGMapsLink] = React.useState<string>("");


    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);


    const extractLocationFromLink = (link: string = "https://www.google.com/maps?q=29.9849710,31.1451910&hl=en-EG&gl=eg&entry=gps&lucs=swa") => {
        /* https://www.google.com/maps?q=29.9849710,31.1451910&hl=en-EG&gl=eg&entry=gps&lucs=swa */
        /* https://www.google.com/maps/place/29%C2%B059'05.9%22N+31%C2%B008'42.7%22E/@29.984971,31.1430023,17z/data=!4m5!3m4!1s0x0:0x0!8m2!3d29.984971!4d31.145191?hl=en-EG */
        const _link = link.split('?q=');
        if (_link.length > 1) {
            setLatitude(parseFloat(_link[1].split(',')[0]));
            setLongitude(parseFloat(_link[1].split(',')[1].split('&h')[0]));
        } else {
            const _link = link.split('/@');
            if (_link.length > 1) {
                setLatitude(parseFloat(_link[1].split(',')[0]));
                setLongitude(parseFloat(_link[1].split(',')[1].split('z/')[0]));

            }
        }


    }

    const handleAddressChange = (name: string, value: any) => {
        console.log({name,value});
        
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
        console.log({UnitNumber: event.target.value});
        
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleFloorNumberChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setFloorNumber(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleLatitudeChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setLatitude(event.target.value as number);
        handleAddressChange(event.target.name, event.target.value as number);
    }
    const handleLongitudeChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setLongitude(event.target.value as number);
        handleAddressChange(event.target.name, event.target.value as number);
    }
    const handleRecipientPhoneNumberChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setRecipientPhoneNumber(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleNearestLandMarkChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setNearestLandMark(event.target.value as string);
        handleAddressChange(event.target.name, event.target.value as string);
    }
    const handleGMapsLinkChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
        setGMapsLink(event.target.value as string);
        // handleAddressChange(event.target.name, event.target.value as string);
        extractLocationFromLink(gMapsLink)
    }
    React.useEffect(() => {
        handleAddressChange("longitude", longitude);
    }, [longitude])
    React.useEffect(() => {
        handleAddressChange("latitude", latitude);
    }, [latitude])

    React.useEffect(() => {
        updateFormValid(
            addressTitle !== '' &&
            buildingNumber !== '' &&
            streetName !== '' &&
            neighbourhood !== '' &&
            state !== '' &&
            unitNumber !== '' &&
            recipientPhoneNumber !== '' &&
            latitude !== undefined &&
            longitude !== undefined
        )

    }, [
        addressTitle,
        buildingNumber,
        streetName,
        neighbourhood,
        state,
        unitNumber,
        recipientPhoneNumber,
        latitude,
        longitude
    ])

    return (
        <div>
            <Grid direction="row" container
                justify="flex-start"
                alignItems="baseline"
                spacing={2}>
                <Grid item xs={12} md={mdSize}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
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
                            fullWidth
                            id="outlined-required"
                            label="اسم الشارع"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={streetName}
                            name="streetName"
                            onChange={handleStreetNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
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
                            fullWidth
                            id="outlined-required"
                            label="اسم المدينة"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={state}
                            name="state"
                            onChange={handleStateChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            required
                            fullWidth
                            id="outlined-required"
                            label="رقم الوحدة"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={unitNumber}
                            name="unitNumber"
                            onChange={handleUnitNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            id="outlined-required"
                            label="رقم الدور"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type="text"
                            value={floorNumber}
                            name="floorNumber"
                            onChange={handleFloorNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="رقم التليفون"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            type=""
                            value={recipientPhoneNumber}
                            name="recipientPhoneNumber"
                            onChange={handleRecipientPhoneNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            className={classes.textField}
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
                    <Grid direction="row" container
                        justify="flex-start"
                        alignItems="center"
                        spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                className={classes.textField}
                                multiline
                                fullWidth
                                id="outlined-required"
                                label="رابط الموقع"
                                variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                                InputProps={{
                                    readOnly: mode === UI_FROM_MODE.VIEW,
                                }}
                                type="text"
                                value={gMapsLink}
                                name="nearestLandMark"
                                onChange={handleGMapsLinkChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                className={classes.textField}
                                required
                                fullWidth
                                id="outlined-required"
                                label="خط العرض"
                                variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                                InputProps={{
                                    readOnly: mode === UI_FROM_MODE.VIEW,
                                }}
                                type="number"
                                value={latitude}
                                name="latitude"
                                onChange={handleLatitudeChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                className={classes.textField}
                                fullWidth
                                required
                                id="outlined-required"
                                label="خط الطول"
                                variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "standard"}
                                InputProps={{
                                    readOnly: mode === UI_FROM_MODE.VIEW,
                                }}
                                type="number"
                                value={longitude}
                                name="longitude"
                                onChange={handleLongitudeChange}
                            />
                        </Grid>
                    </Grid>

                    <div className={classes.mapWrapper}>
                        {/* <Typography component="span" variant="h5">{latitude}</Typography>
                        <Typography component="span" variant="h5">{"----------"}</Typography>
                        <Typography component="span" variant="h5">{longitude}</Typography> */}
                        <MapLocator
                            latitude={latitude}
                            longitude={longitude}
                            updateLatitude={setLatitude}
                            updateLongitude={setLongitude} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddressForm
