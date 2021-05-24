import React from 'react';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { addNewCategory, getCategoriesList, editCategory, loadCategoriesList } from '../../redux/actions/categoriesActions';
import { SettingActionTypes } from '../../models/Settings';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';
import { TProduct } from '../../models/Products';


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

const CategoryDetailsForm = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { open, handleClose, mode } = props;
    const selectedCategory = useSelector((state: AppState) => state.settings.selectedCategory);
    const isLoadingSelectedCategory = useSelector((state: AppState) => state.settings.isLoadingSelectedCategory);

    const [enName, setEnName] = React.useState<string>(selectedCategory.enName || '');
    const [arName, setArName] = React.useState<string>(selectedCategory.arName || '');
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const formCleanUpAndClose = () => {
        setEnName("");
        setArName("");
        handleClose();
    }

    const handleEnNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEnName(event.target.value as string)
    }
    const handleArNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setArName(event.target.value as string)
    }
    React.useEffect(() => {
        setEnName(selectedCategory.enName)
        setArName(selectedCategory.arName)
    }, [selectedCategory])

    const handleSubmit = () => {
        setIsFormValid(false);
        dispatch({
            type: SettingActionTypes.SET_IS_LOADING_CATEGORIES,
            payload: true
        });
        switch (mode) {
            case UI_FROM_MODE.NEW:
                addNewCategory(enName, arName).then(res => {
                    loadCategoriesList(dispatch);
                    formCleanUpAndClose();
                })
                break;
            case UI_FROM_MODE.EDIT:
                editCategory(enName, arName, selectedCategory.id).then(res => {
                    loadCategoriesList(dispatch);
                    formCleanUpAndClose();
                })
                break; break;

            default:
                break;
        }
    };

    React.useEffect(() => {
        setIsFormValid(enName !== '' && arName !== '')

    }, [enName, arName])

    React.useEffect(() => {
        switch (mode) {
            case UI_FROM_MODE.EDIT:
            case UI_FROM_MODE.VIEW:
                setEnName(selectedCategory?.enName || '');
                setArName(selectedCategory?.arName || '');
                break;
            case UI_FROM_MODE.NEW:
                setEnName("");
                setArName("");
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
                    <Typography variant="h4">{mode !== UI_FROM_MODE.NEW ? selectedCategory.arName : "إضافة فئة منتجات جديدة"}</Typography>
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
                            label="اسم الفئة بالعرية"
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
                            label="اسم الفئة بالإنجليزية"
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
                {mode === UI_FROM_MODE.VIEW && selectedCategory?.products?.length > 0 &&
                    < List >
                        <Typography variant="h5">قائمة المنتجات</Typography>
                        {selectedCategory?.products?.map((product: TProduct) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar variant="square">
                                        {product.thumbnailBase64 ? <CardMedia
                                            // className={classes.cover}
                                            component="img"
                                            image={`data:image/png;base64,${product.thumbnailBase64}`}
                                            title="Main Product Image"
                                        /> : <ImageIcon />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                            </ListItem>
                        ))

                        }
                    </List>
                }
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

export default CategoryDetailsForm
