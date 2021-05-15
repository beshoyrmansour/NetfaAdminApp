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
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { getCategoriesList, deleteCategory } from '../../redux/actions/categoriesActions';
import { AxiosResponse } from 'axios';
import { SettingActionTypes } from '../../models/Settings';
import LoadingIndicator from '../LoadingIndicator';
import { TCategory } from '../../models/Categories';
import ConfirmDialog from '../ConfirmDialog';
import CategoryDetailsForm from './CategoryDetailsForm';
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

const CategoriesList = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = React.useState<TCategory | null>(null);
    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });
    const [openForm, setOpenForm] = React.useState<boolean>(false);
    const [formMode, setFormMode] = React.useState<UI_FROM_MODE>(UI_FROM_MODE.VIEW);

    const categories = useSelector((state: AppState) => state.settings.categories);
    const isLoadingCategories = useSelector((state: AppState) => state.settings.isLoadingCategories);


    const loadCategoriesList: () => void = () => {
        getCategoriesList().then((res: AxiosResponse) => {
            if (res.status === 200) {
                dispatch({
                    type: SettingActionTypes.FETCH_ALL_CATEGORIES,
                    payload: res.data.categories
                })
            }
        })
    }

    React.useEffect(() => {
        dispatch({
            type: SettingActionTypes.SET_IS_LOADING_CATEGORIES,
            payload: true
        });
        loadCategoriesList();
    }, []);

    const handleEditCategory: (category: TCategory) => void = (category) => {
        setFormMode(UI_FROM_MODE.EDIT)
        setOpenForm(true);
        dispatch({
            type: SettingActionTypes.SET_SELECTED_CATEGORY,
            payload: category
        })
    }

    const handleDeleteCategory: (category: TCategory) => void = (category) => {
        console.log({ category });
        setSelectedCategory(selectedCategory);
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد حذف الفئة "${category.arName}"`);
        setConfirmDialogSubmit('حذف');
        setOpenConfirmDialog(true);
        const _deleteCategory: () => void = () => {
            console.log({ handleDeleteCategory_OnSubmit: category });
            dispatch({
                type: SettingActionTypes.SET_IS_LOADING_CATEGORIES,
                payload: true
            });
            deleteCategory(category).then(() => {
                loadCategoriesList();
                setOpenConfirmDialog(false);
                setConfirmDialogTitle('');
                setConfirmDialogMessage('');
                setConfirmDialogSubmit('');
            })
        }
        setOnSubmit((prev) => _deleteCategory)
    }

    const handleViewCategory: (category: TCategory) => void = (category) => {
        setFormMode(UI_FROM_MODE.VIEW)
        setOpenForm(true);
        dispatch({
            type: SettingActionTypes.SET_SELECTED_CATEGORY,
            payload: category
        })

    }
    const handleConfirmDialogCancel: () => void = () => {
        console.log({ handleConfirmDialogCancel: selectedCategory });
        setOpenConfirmDialog(false);

        console.log({ selectedCategory });
    }
    const handleEditFormSubmit: () => void = () => {
        console.log({ handleConfirmDialogSubmit: selectedCategory });
        console.log({ selectedCategory });
        setOpenConfirmDialog(false);
    }

    return (
        <>
            {isLoadingCategories ? <LoadingIndicator width="100%" height="400px" /> : (<List className={classes.root}>
                {categories.length ? categories.map((category: TCategory) => (
                    <ListItem key={category.id}>
                        <ListItemText primary={category.arName} secondary={category.enName} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="Edit" onClick={() => handleEditCategory(category)}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category)}>
                                <DeleteIcon color="primary" />
                            </IconButton>
                            <IconButton edge="end" aria-label="view" onClick={() => handleViewCategory(category)}>
                                <ChevronLeftIcon color="secondary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )) :
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        style={{
                            width: "100%",
                            height: "400px",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>لا يوجد فئات للمنتجات</Typography>}
            </List>)}
            <ConfirmDialog
                title={confirmDialogTitle}
                message={confirmDialogMessage}
                sumbit={confirmDialogSubmit}
                onCancel={handleConfirmDialogCancel}
                onSubmit={onSubmit}
                open={openConfirmDialog}
            />
            <CategoryDetailsForm
                open={openForm}
                handleClose={() => { setOpenForm(false) }}
                mode={formMode}/>

        </>
    )
}

export default CategoriesList
