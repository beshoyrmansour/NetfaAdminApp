import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ProductsActionTypes } from '../models/Products';
import { UI_FROM_MODE } from '../models/configs';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';

interface Props {
    toggleOpenProductForm: () => void;
    mode: UI_FROM_MODE
}

const useStyles = makeStyles((theme: Theme) => ({
    formContainer: {
        minWidth: '200px',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        // backgroundColor: 'red',
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            minWidth: '600px',
        },
    },
    textField: {
        marginBottom: '1.2rem'
    },
    title: {
        display: 'flex',
        marginTop: '1.2rem',
        marginBottom: '1.6rem',
        justifyContent: 'space-between',
    },
    isVisableSwitch: {
        marginBottom: theme.spacing(2),

    },
    formWrapper: {
        flexGrow: 1
        // height: '100%'
    },
    uploadBlock: {
        display: 'flex',
    },

    uploadButtonBlock: {
        display: 'flex',
        marginBottom: theme.spacing(2),
    },

    uploadLabel: {
        marginBottom: theme.spacing(2)
    },
    cover: {
        width: 150,
        height: 150,
    },
    paddingRight_1: { paddingRight: theme.spacing(1) },
}));

const ProductForm = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const selectedProduct = useSelector((state: AppState) => state.products.selectedProduct);

    const { toggleOpenProductForm, mode } = props
    const [quantityId, setQuantityId] = React.useState('0');
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [isVisable, setIsVisable] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const [thumbnailLink, setThumbnailLink] = React.useState('');
    const [mainImageLink, setmainImageLink] = React.useState('');
    const [unitPrice, setUnitPrice] = React.useState('0.0');


    const handleIsVisableChange = (event: React.ChangeEvent<{ checked: boolean }>) => {
        setIsVisable(event.target.checked);
    };

    const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setName(event.target.value as string);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDescription(event.target.value as string);
    };
    const handlePriceChange = (e: React.ChangeEvent<{ value: string }>) => {
        const rx_live = /^[+-]?\d*(?:[.]\d*)?$/;
        if (rx_live.test(e.target.value))
            setUnitPrice(e.target.value || '0.0')
    }

    const handlequantityIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setQuantityId(event.target.value as string);
    };
    const handleThumbnailImageChange = (event: any) => {
        if (event.target.files.length) {
            const imageFile = URL.createObjectURL(event.target.files[0])
            setThumbnailLink(imageFile);
        };
    };
    const handleMainImageChange = (event: any) => {
        if (event.target.files.length) {
            const imageFile = URL.createObjectURL(event.target.files[0]);
            setmainImageLink(imageFile);
        };
    };

    React.useEffect(() => {
        console.log({
            quantityId,
            description,
            name,
            isVisable,
            thumbnailLink,
            mainImageLink,
            price: unitPrice,
            IsValid: (quantityId !== '' &&
                description !== '' &&
                name !== '' &&
                thumbnailLink !== '' &&
                mainImageLink !== '' &&
                unitPrice !== '')
        });
        setIsValid(quantityId !== '' &&
            description !== '' &&
            name !== '' &&
            thumbnailLink !== '' &&
            mainImageLink !== '' &&
            unitPrice !== '')
    }, [
        quantityId,
        description,
        name,
        isVisable,
        thumbnailLink,
        mainImageLink,
        unitPrice
    ])

    React.useEffect(() => {
        switch (mode) {
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.VIEW:
                setQuantityId(('quantityId' in selectedProduct && selectedProduct.quantityId) ? selectedProduct.quantityId.toString() : '0')
                setDescription(('description' in selectedProduct && selectedProduct.description) ? selectedProduct.description : '')
                setName(('name' in selectedProduct && selectedProduct.name) ? selectedProduct.name : '')
                setIsVisable(('isVisable' in selectedProduct && selectedProduct.isVisable) ? selectedProduct.isVisable : true)
                setThumbnailLink(('thumbnailLink' in selectedProduct && selectedProduct.thumbnailLink) ? selectedProduct.thumbnailLink : '')
                setmainImageLink(('mainImageLink' in selectedProduct && selectedProduct.mainImageLink) ? selectedProduct.mainImageLink : '')
                setUnitPrice(('unitPrice' in selectedProduct && selectedProduct.unitPrice) ? selectedProduct.unitPrice.toString() : '0.0')
                break;
            default:
                break;
        }
    }, [mode])

    const handleSubmitNewProduct = () => {
        console.log("handleSubmitNewProduct");
        dispatch({
            type: ProductsActionTypes.SET_IS_LOADING_PRODUCTS,
            payload: true
        })
        setTimeout(() => {
            dispatch({
                type: ProductsActionTypes.ADD_PRODUCT,
                payload: {
                    quantityId,
                    description,
                    name,
                    isVisable,
                    thumbnailLink,
                    mainImageLink,
                    price: unitPrice
                }
            })
        }, 1000);
        if (isValid) {
            // submitNewProduct({
            //     quantityId,
            //     description,
            //     name,
            //     isVisable,
            //     thumbnailLink,
            //     mainImageLink,
            //     price
            // })
        }
    }
    const handleSubmitEditProduct = () => {
        console.log("handleSubmitEditProduct");
        dispatch({
            type: ProductsActionTypes.SET_IS_LOADING_PRODUCTS,
            payload: true
        })
        setTimeout(() => {
            dispatch({
                type: ProductsActionTypes.UPDATE_PRODUCT,
                payload: {
                    quantityId,
                    description,
                    name,
                    isVisable,
                    thumbnailLink,
                    mainImageLink,
                    price: unitPrice
                }
            })
        }, 1000);

    }
    const getFormName = () => {
        switch (mode) {
            case UI_FROM_MODE.NEW:
                return 'إضافة منتج جديد'
            default:
                return 'name' in selectedProduct ? selectedProduct.name : ''
        }
    }
    return (

        <Container maxWidth="lg" className={classes.formContainer}>
            <div className={classes.title}>

                <Typography variant="h4">{getFormName()}</Typography>
                <IconButton onClick={toggleOpenProductForm}><CloseIcon /></IconButton>
            </div>

            <form autoComplete="on" className={classes.formWrapper}>

                <TextField
                    className={classes.textField}
                    required
                    fullWidth
                    id="item-name"
                    label="الاسم"
                    defaultValue=""
                    variant={mode === UI_FROM_MODE.VIEW ? "standard" : "outlined"}
                    value={name}
                    onChange={handleNameChange}
                    disabled={mode === UI_FROM_MODE.VIEW}
                />
                <TextField
                    className={classes.textField}
                    required
                    multiline
                    fullWidth
                    rows={4}
                    id="outlined-required"
                    label="الوصف"
                    defaultValue=""
                    variant={mode === UI_FROM_MODE.VIEW ? "standard" : "outlined"}
                    disabled={mode === UI_FROM_MODE.VIEW}
                    value={description}
                    onChange={handleDescriptionChange}
                />

                <Grid direction="row" container
                    justify="flex-start"
                    alignItems="flex-start">
                    <FormControlLabel className={classes.isVisableSwitch}
                        control={<Switch checked={isVisable} onChange={handleIsVisableChange} name="isVisableSwitch" inputProps={{ 'aria-label': 'is product visable Switch' }}
                            // variant={mode === UI_FROM_MODE.VIEW ? "standard" : "outlined"}
                            disabled={mode === UI_FROM_MODE.VIEW} />}
                        label={`إظهار المنتج للعملاء (${isVisable ? 'مرئي' : 'غير مرئي'})`}
                    />
                </Grid>
                <Grid direction="row" container
                    justify="flex-start"
                    alignItems="flex-start">
                    <Grid xs={6} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="السعر الوحدة"
                            defaultValue=""
                            variant={mode === UI_FROM_MODE.VIEW ? "standard" : "outlined"}
                            disabled={mode === UI_FROM_MODE.VIEW}
                            type="number"
                            value={unitPrice}
                            onChange={handlePriceChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">ريال</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid xs={6} >
                        <FormControl
                            variant={mode === UI_FROM_MODE.VIEW ? "standard" : "outlined"}
                            disabled={mode === UI_FROM_MODE.VIEW}
                            fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">الكمية الافتراضية</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={quantityId}
                                onChange={handlequantityIdChange}
                                label="Age"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid xs={6} direction="column" className={`${classes.uploadBlock} ${classes.paddingRight_1}`}>
                        <Grid direction="column" className={classes.uploadButtonBlock}
                            justify="flex-start"
                            alignItems="flex-start">
                            {/* <Paper> */}
                            <Typography variant="subtitle1" className={classes.uploadLabel}>
                                إرفاق صورة مصغرة
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                component="label"
                            >إختيار الصورة<input
                                    type="file"
                                    hidden
                                    onChange={handleThumbnailImageChange}
                                />
                            </Button>
                        </Grid>
                        <CardMedia
                            className={classes.cover}
                            image={thumbnailLink}
                            title="Product thumbnail image"
                        />
                    </Grid>
                    <Grid xs={6} direction="column" className={classes.uploadBlock}>
                        <Grid direction="column" className={classes.uploadButtonBlock}
                            justify="flex-start"
                            alignItems="flex-start">
                            {/* <Paper> */}
                            <Typography variant="subtitle1" className={classes.uploadLabel}>
                                إرفاق الصورة الاساسية
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                component="label"
                            >إختيار الصورة<input
                                    type="file"
                                    hidden
                                    onChange={handleMainImageChange}
                                />
                            </Button>
                        </Grid>
                        <CardMedia
                            className={classes.cover}
                            image={mainImageLink}
                            title="Main Product Image"
                        />
                    </Grid>
                </Grid>
            </form>

            <Button color="primary" variant="contained" disabled={!isValid} onClick={() => { mode === UI_FROM_MODE.NEW ? handleSubmitNewProduct() : handleSubmitEditProduct() }}>حفظ</Button>
        </Container>
    )
}

export default ProductForm
