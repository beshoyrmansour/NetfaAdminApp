import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ProductsActionTypes, TProduct } from '../models/Products';
import { UI_FROM_MODE } from '../models/configs';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import { createOrUpdateBundleProduct, deleteProduct, loadBundleProducts, toggleProducts } from '../redux/actions/bundlesActions';
import { TCategory } from '../models/Categories';
import { getCategoriesList } from '../redux/actions/categoriesActions';
import ConfirmDialog from './ConfirmDialog';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import LoadingIndicator from './LoadingIndicator';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import { loadSingleOrderItemsProducts } from '../redux/actions/productsActions';
import { TBundle } from '../models/Bundles';

interface Props {
    toggleOpenBundleForm: () => void;
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
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },

    uploadButtonBlock: {
        display: 'flex',
        marginBottom: theme.spacing(2),
    },

    uploadLabel: {
        marginBottom: theme.spacing(2)
    },
    cover: {
        height: 230,
        maxWidth: 360,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'contain',
        textAlign: 'center'
    },
    paddingRight_1: { paddingRight: theme.spacing(1) },
    marginRight_2: { marginRight: theme.spacing(2) },
    saveButton: { marginBottom: theme.spacing(1) },
    productList: {
        maxHeight: "400px",
        overflowY: "auto",
    }
}));

const BundleForm = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { toggleOpenBundleForm, mode } = props
    const selectedProduct = useSelector((state: AppState) => state.bundles.selectedProduct);
    const singleOrderItemsProducts = useSelector((state: AppState) => state.products.products);
    const isLoadingSingleOrderItemsProducts = useSelector((state: AppState) => state.products.isLoadingProducts);

    // const [mainImageId, setMainImageId] = React.useState(0);
    const [enName, setEnName] = React.useState<string>("");
    const [arName, setArName] = React.useState<string>("");
    const [thumbnailBase64, setThumbnailBase64] = React.useState<string>("");
    const [unitPrice, setUnitPrice] = React.useState<number | null>(null);
    const [categoryId, setCategoryId] = React.useState<number | null>(null);
    const [enDescription, setEnDescription] = React.useState<string>("");
    const [arDescription, setArDescription] = React.useState<string>("");
    const [isAvailableForPurchase, setIsAvailableForPurchase] = React.useState<boolean>(true);
    const [thumbnailLink, setThumbnailLink] = React.useState<string>('');
    const [mainImageLink, setMainImageLink] = React.useState<string>('');
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const [thumbnailFile, setThumbnailFile] = React.useState<any>(null);
    const [mainImageFile, setMainImageFile] = React.useState<any>(null);
    const [thumbnailErrorText, setThumbnailErrorText] = React.useState<string>('');
    const [mainImageErrorText, setMainImageErrorText] = React.useState<string>('');
    const [categoriesList, setCategoriesList] = React.useState([]);
    const [selectedProductsList, setSelectedProductsList] = React.useState<number[]>([]);


    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });

    const handleEnNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEnName(event.target.value as string)
    }

    const handleArNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setArName(event.target.value as string)
    }

    const handleUnitPriceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const rx_live = /^[+-]?\d*(?:[.]\d*)?$/;
        if (rx_live.test(event.target.value as string))
            setUnitPrice(event.target.value as number || 0)
    }

    const handleCategoryIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategoryId(event.target.value as number)
    }

    const handleEnDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEnDescription(event.target.value as string)
    }

    const handleArDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setArDescription(event.target.value as string)
    }

    const handleIsAvailableForPurchaseChange = (event: React.ChangeEvent<{ checked: boolean }>) => {
        if (mode !== UI_FROM_MODE.VIEW) setIsAvailableForPurchase(event.target.checked)
    }

    const _handleReaderLoaded = (readerEvt: any) => {
        let binaryString = readerEvt.target.result;
        setThumbnailBase64(btoa(binaryString))
    }

    const handleThumbnailLinkChange = (event: any) => {
        if (event.target.files.length && event.target.files[0].size < 5242880) {
            const imageFileURL = URL.createObjectURL(event.target.files[0]);
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded
            reader.readAsBinaryString(event.target.files[0])
            setThumbnailBase64(reader.result as string)
            setThumbnailLink(imageFileURL);
            setThumbnailFile(event.target.files[0]);
            setThumbnailErrorText("");
        } else {
            setThumbnailErrorText("يجب أن يكون حجم الملف أقل من 5 ميغابايت ويمكن أن يكون التنسيق بتنسيق JPG أو PNG. ");
            setThumbnailLink("");

        };
    };

    const handleMainImageLinkChange = (event: any) => {
        if (event.target.files.length && event.target.files[0].size < 5242880) {
            const imageFileURL = URL.createObjectURL(event.target.files[0]);
            setMainImageLink(imageFileURL);
            setMainImageFile(event.target.files[0]);
            setMainImageErrorText("");
        } else {
            setMainImageErrorText("يجب أن يكون حجم الملف أقل من 5 ميغابايت ويمكن أن يكون التنسيق بتنسيق JPG أو PNG. ");
            setMainImageLink("");
        };
    };

    const handleDeleteProduct: (product: TBundle) => void = (product) => {
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد حذف المنتج من قائمة المنتجات`);
        setConfirmDialogSubmit("حذف");
        setOpenConfirmDialog(true);
        const _deleteProduct: () => void = () => {
            dispatch({
                type: ProductsActionTypes.SET_IS_LOADING_PRODUCTS,
                payload: true
            });
            deleteProduct(product.id as number).then(() => {
                loadBundleProducts(dispatch);
                setOpenConfirmDialog(false);
                setConfirmDialogTitle('');
                setConfirmDialogMessage('');
                setConfirmDialogSubmit('');
            })
        }
        setOnSubmit((prev) => _deleteProduct)
    }

    const handleToggleProduct: (product: TBundle) => void = (product) => {
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد ${product.isAvailableForPurchase ? 'اخفاء' : 'إظهار'} المنتج "${product.arName}"  ${product.isAvailableForPurchase ? 'من' : 'في'} قائمة المنتجات علي التطبيق`);
        setConfirmDialogSubmit(`${product.isAvailableForPurchase ? 'اخفاء' : 'إظهار'}`);
        setOpenConfirmDialog(true);
        const _toggleProduct: () => void = () => {
            dispatch({
                type: ProductsActionTypes.SET_IS_LOADING_PRODUCTS,
                payload: true
            });
            toggleProducts([product.id as number], product.isAvailableForPurchase).then(() => {
                loadBundleProducts(dispatch);
                setOpenConfirmDialog(false);
                setConfirmDialogTitle('');
                setConfirmDialogMessage('');
                setConfirmDialogSubmit('');
            })
        }
        setOnSubmit((prev) => _toggleProduct)
    }

    const handleConfirmDialogCancel: () => void = () => {
        setOpenConfirmDialog(false);
    }


    React.useEffect(() => {

        setIsFormValid(
            enName !== '' &&
            arName !== '' &&
            unitPrice !== null &&
            categoryId !== null &&
            enDescription !== '' &&
            arDescription !== '' &&
            thumbnailLink !== '' &&
            mainImageLink !== '' &&
            selectedProductsList.length > 1
        )
    }, [
        enName,
        arName,
        thumbnailBase64,
        unitPrice,
        categoryId,
        enDescription,
        arDescription,
        thumbnailLink,
        mainImageLink,
        selectedProductsList,
    ])

    React.useEffect(() => {
        switch (mode) {
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.VIEW:
                setEnName(selectedProduct?.enName || '');
                setArName(selectedProduct?.arName || '');
                setThumbnailBase64(selectedProduct?.thumbnailBase64 || '');
                setUnitPrice(selectedProduct?.unitPrice || 0);
                setCategoryId(selectedProduct?.categoryId || null);
                setEnDescription(selectedProduct?.enDescription || '');
                setArDescription(selectedProduct?.arDescription || '');
                setIsAvailableForPurchase(selectedProduct?.isAvailableForPurchase || true);
                setThumbnailLink(selectedProduct?.thumbnailBase64 ? `data:image/png;base64,${selectedProduct?.thumbnailBase64}` : '');
                setMainImageLink(selectedProduct?.mainImageLink || '');
                setThumbnailFile(selectedProduct?.thumbnailBase64 || selectedProduct?.thumbnailBase64);
                setMainImageFile(selectedProduct?.mainImageFile || '');
                setSelectedProductsList(selectedProduct.content.length ? selectedProduct?.content?.map((b: TBundle) => b.id) : [])

                break;
            case UI_FROM_MODE.NEW:
                setEnName('');
                setArName('');
                setThumbnailBase64('');
                setUnitPrice(0);
                setCategoryId(null);
                setEnDescription('');
                setArDescription('');
                setIsAvailableForPurchase(true);
                setThumbnailLink('');
                setMainImageLink('');
                setThumbnailFile(selectedProduct?.thumbnailBase64);
                setMainImageFile('');
                setSelectedProductsList([]);
                break;
            default:
                break;
        }
    }, [mode]);

    const handleSingleItemProductSubmit = () => {
        dispatch({
            type: ProductsActionTypes.SET_IS_LOADING_PRODUCTS,
            payload: true
        })
        setIsFormValid(false);


        createOrUpdateBundleProduct(
            mainImageFile,
            {
                id: selectedProduct?.id,
                enName: enName,
                arName: arName,
                thumbnailBase64: thumbnailBase64,
                unitPrice: unitPrice as number,
                isAvailableForPurchase: isAvailableForPurchase,
                categoryId: categoryId as number,
                enDescription: enDescription,
                arDescription: arDescription,
                contentIds: selectedProductsList,

            },
            mode).then((res: any) => {

                if (res.status === 201) {
                    loadBundleProducts(dispatch);
                    toggleOpenBundleForm();
                }
                else {
                    alert('ERROR');
                    console.log({ error: res });

                }
            }).catch(err => {
                console.log({ AFTER__ERR__createOrUpdateSingleItemProduct: err });
                // hadleError(err.response?.data?.errors || [{ Gereral: 'حدث خطأ' }]);
                console.log({ errors: err.response?.data?.errors });
            });
    }

    const getFormName = () => {
        switch (mode) {
            case UI_FROM_MODE.NEW:
                return 'إضافة مجموعة جديدة'
            default:
                return 'arName' in selectedProduct ? selectedProduct.arName : ''
        }
    }

    React.useEffect(() => {
        getCategoriesList().then((res: any) => {
            if (res?.status === 200) {
                setCategoriesList(res?.data?.categories)
            } else {

            }
        })

        if (singleOrderItemsProducts.length <= 0) {
            loadSingleOrderItemsProducts(dispatch);
        }
    }, [])

    const handleSelectedProductToggle = (product: TProduct) => () => {
        const currentIndex = selectedProductsList.indexOf(product.id as number);
        const newChecked = [...selectedProductsList];

        if (currentIndex === -1) {
            newChecked.push(product.id as number);
            setUnitPrice((prevPrice) => (prevPrice as number) + (product.unitPrice as number));
        } else {
            newChecked.splice(currentIndex, 1);
            setUnitPrice((prevPrice) => (prevPrice as number) - (product.unitPrice as number));
        }
        if (newChecked.length <= 0) {
            setUnitPrice(0);
        }
        setSelectedProductsList(newChecked);
    };

    const renderSingleProductList = () => {
        switch (mode) {
            case UI_FROM_MODE.VIEW:
                return selectedProduct.content?.length <= 0 ? <Typography gutterBottom>لا يوجد منتجات</Typography> : (<List>
                    {selectedProduct.content?.map((product: TProduct) => (<ListItem key={product.id} role={undefined} dense button onClick={handleSelectedProductToggle(product)}>
                        <ListItemAvatar>
                            {product.thumbnailBase64 ? <Avatar alt="Cindy Baker" src={`data:image/png;base64,${product.thumbnailBase64}`} /> : <ImageIcon />}
                        </ListItemAvatar>
                        <ListItemText id={(product.id as number).toString()} primary={product.arName} />
                        <ListItemSecondaryAction>
                            <Typography>{product.unitPrice} ريال</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>))}
                </List>);

            // case UI_FROM_MODE.EDIT:
            //     return selectedProduct.content?.length <= 0 ? <Typography gutterBottom>لا يوجد منتجات</Typography> : (<List>
            //         {selectedProduct.content?.map((product: TProduct) => (<ListItem key={product.id} role={undefined} dense button onClick={handleSelectedProductToggle(product)}>
            //             <ListItemIcon>
            //                 <Checkbox
            //                     edge="start"
            //                     checked={selectedProductsList.indexOf(product.id as number) !== -1}
            //                     tabIndex={-1}
            //                     disableRipple
            //                     inputProps={{
            //                         'aria-labelledby': product.arName,
            //                     }}
            //                 />
            //             </ListItemIcon>
            //             <ListItemAvatar>
            //                 {product.thumbnailBase64 ? <Avatar alt="Cindy Baker" src={`data:image/png;base64,${product.thumbnailBase64}`} /> : <ImageIcon />}
            //             </ListItemAvatar>
            //             <ListItemText id={(product.id as number).toString()} primary={product.arName} />
            //             <ListItemSecondaryAction>
            //                 <Typography>{product.unitPrice} ريال</Typography>
            //             </ListItemSecondaryAction>
            //         </ListItem>))}
            //     </List>);
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.NEW:
                return isLoadingSingleOrderItemsProducts ? (<LoadingIndicator width="100%" height="300px" />) : (<List>
                    {singleOrderItemsProducts.map((product: TProduct) => (<ListItem key={product.id} role={undefined} dense button onClick={handleSelectedProductToggle(product)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedProductsList.indexOf(product.id as number) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                    'aria-labelledby': product.arName,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemAvatar>
                            {product.thumbnailBase64 ? <Avatar alt="Cindy Baker" src={`data:image/png;base64,${product.thumbnailBase64}`} /> : <ImageIcon />}
                        </ListItemAvatar>
                        <ListItemText id={(product.id as number).toString()} primary={product.arName} />
                        <ListItemSecondaryAction>
                            <Typography>{product.unitPrice} ريال</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>))}
                </List>)

            default:
                break;
        }
    }
    return (

        <Container maxWidth="lg" className={classes.formContainer}>
            <div className={classes.title}>

                <Typography variant="h4">{getFormName()}</Typography>
                <div>
                    {mode === UI_FROM_MODE.EDIT && <>
                        <Button
                            onClick={() => handleToggleProduct(selectedProduct)}
                            variant="outlined"
                            color="primary"
                            className={classes.marginRight_2}
                            endIcon={selectedProduct.isAvailableForPurchase ? <VisibilityOffIcon color="primary" /> : <VisibilityIcon color="primary" />}
                        > {` ${selectedProduct.isAvailableForPurchase ? 'اخفاء' : 'إظهار'} المنتج `}</Button>
                        <Button
                            onClick={() => handleDeleteProduct(selectedProduct)}
                            variant="outlined"
                            color="primary"
                            className={classes.marginRight_2}
                            endIcon={<DeleteIcon />}
                        > حذف المنتج </Button>
                    </>}
                    <IconButton onClick={toggleOpenBundleForm}><CloseIcon /></IconButton>
                </div>
            </div>

            <form autoComplete="on" className={classes.formWrapper}>

                <Grid direction="row" container
                    justify="flex-start"
                    alignItems="flex-start">
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            fullWidth
                            id="item-arName"
                            label="الاسم العربي"

                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "outlined"}
                            value={arName}
                            onChange={handleArNameChange}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                        />

                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            rows={4}
                            label="الوصف العربي"
                            id="outlined-arDescription"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "outlined"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            value={arDescription}
                            onChange={handleArDescriptionChange}
                        />
                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                            className={classes.textField}
                            required
                            fullWidth
                            id="item-enName"
                            label="الاسم الانجليزي"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "outlined"}
                            value={enName}
                            onChange={handleEnNameChange}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }} />
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            rows={4}
                            id="outlined-enDescription"
                            label="الوصف الانجليزي"
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "outlined"}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                            }}
                            value={enDescription}
                            onChange={handleEnDescriptionChange}
                        />
                    </Grid>
                </Grid>

                <Grid direction="row" container
                    justify="flex-start"
                    alignItems="center"
                    className={classes.textField}>
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        <FormControl
                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "outlined"}
                            disabled={mode === UI_FROM_MODE.VIEW}
                            fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">الفئة</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={categoryId}
                                onChange={handleCategoryIdChange}
                                label="CategoryId"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {categoriesList.map((cat: TCategory) => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat?.arName}</MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControlLabel className={classes.isVisableSwitch}
                            control={<Switch checked={isAvailableForPurchase} onChange={handleIsAvailableForPurchaseChange} name="isVisableSwitch" inputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                                'aria-label': 'is product visable Switch'
                            }}
                            // variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "outlined"}
                            // disabled={mode === UI_FROM_MODE.VIEW}
                            />}
                            label={`إظهار المنتج للعملاء (${isAvailableForPurchase ? 'مرئي' : 'غير مرئي'})`}
                        />
                    </Grid>

                </Grid>

                <Grid direction="row" container
                    justify="flex-start"
                    alignItems="flex-start">
                    <Grid item xs={6} className={classes.paddingRight_1}>
                        <TextField
                            className={classes.textField}
                            required
                            multiline
                            fullWidth
                            id="outlined-required"
                            label="السعر الوحدة"

                            variant={mode === UI_FROM_MODE.VIEW ? "outlined" : "outlined"}
                            type="number"
                            value={unitPrice}
                            onChange={handleUnitPriceChange}
                            InputProps={{
                                readOnly: mode === UI_FROM_MODE.VIEW,
                                endAdornment: <InputAdornment position="start">ريال</InputAdornment>,
                            }}
                        />

                    </Grid>
                </Grid>

                <Grid direction="row" container>
                    <Grid item xs={6} container direction="column" className={`${classes.uploadBlock} ${classes.paddingRight_1}`}>
                        <Grid direction="column" className={classes.uploadButtonBlock}
                            justify="flex-start"
                            container
                            alignItems="flex-start">
                            <Typography variant="subtitle1" className={classes.uploadLabel}>
                                صورة مصغرة
                            </Typography>
                            {mode !== UI_FROM_MODE.VIEW && <Button
                                variant="contained"
                                color="primary"
                                component="label"
                            >إختيار الصورة<input
                                    type="file"
                                    hidden
                                    onChange={handleThumbnailLinkChange}
                                    accept="image/x-png,image/gif,image/jpeg"
                                />
                            </Button>}
                        </Grid>
                        {thumbnailErrorText !== '' ? <Typography variant="subtitle1" color="error" className={classes.cover}>
                            {thumbnailErrorText}
                        </Typography> : thumbnailLink && <CardMedia
                            className={classes.cover}
                            component="img"
                            image={thumbnailLink}
                            title="Product thumbnail image"
                        />}
                    </Grid>
                    <Grid item xs={6} container direction="column" className={classes.uploadBlock}>
                        <Grid direction="column" className={classes.uploadButtonBlock}
                            justify="flex-start"
                            container
                            alignItems="flex-start">
                            <Typography variant="subtitle1" className={classes.uploadLabel}>
                                الصورة الاساسية
                            </Typography>
                            {mode !== UI_FROM_MODE.VIEW && <Button
                                variant="contained"
                                color="primary"
                                component="label"
                            >إختيار الصورة<input
                                    type="file"
                                    hidden
                                    onChange={handleMainImageLinkChange}
                                    accept="image/x-png,image/gif,image/jpeg"
                                />
                            </Button>}
                        </Grid>
                        {mainImageErrorText !== '' ? <Typography variant="subtitle1" color="error" className={classes.cover}>
                            {mainImageErrorText}
                        </Typography> : mainImageLink && <CardMedia
                            className={classes.cover}
                            component="img"
                            image={mainImageLink}
                            title="Main Product Image"
                        />}

                    </Grid>
                    <Grid item xs={12} container direction="column" className={classes.productList}>
                        <Typography variant="h5" gutterBottom>قائمة المنتجات</Typography>
                        {renderSingleProductList()}
                    </Grid>
                </Grid>
            </form>
            <ConfirmDialog
                title={confirmDialogTitle}
                message={confirmDialogMessage}
                sumbit={confirmDialogSubmit}
                onCancel={handleConfirmDialogCancel}
                onSubmit={onSubmit}
                open={openConfirmDialog}
            />
            {mode !== UI_FROM_MODE.VIEW && <Button color="primary" variant="contained" disabled={!isFormValid} className={classes.saveButton} onClick={handleSingleItemProductSubmit}>حفظ</Button>}
        </Container>
    )
}

export default BundleForm
