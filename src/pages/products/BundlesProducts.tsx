import React, { useState } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import CardMedia from '@material-ui/core/CardMedia';

import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
// import FilterListIcon from '@material-ui/icons/FilterList';

import { TProduct } from '../../models/Products';
import { BundlesActionTypes } from '../../models/Bundles';
import BundleForm from '../../components/BundleForm';
import { TOGGLE_MODES, UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProducts, deleteProductsBulk, loadBundleProducts } from '../../redux/actions/bundlesActions';
import LoadingIndicator from '../../components/LoadingIndicator';
import ConfirmDialog from '../../components/ConfirmDialog';

// interface Product {
//     calories: number;
//     carbs: number;
//     fat: number;
//     name: string;
//     protein: number;
// }


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy: Key,
// ): (a: { [key in Key]: string }, b: { [key in Key]: string }) => string {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: Product[], comparator: (a: T, b: T) => string) {
//     const stabilizedThis = array.map((el, index) => [el, index] as [T, string]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

interface HeadCell {
    disablePadding: boolean;
    id: keyof TProduct;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'arName', numeric: false, disablePadding: true, label: 'الإسم' },
    { id: 'thumbnailBase64', numeric: false, disablePadding: false, label: 'صورة المنتج' },
    { id: 'unitPrice', numeric: true, disablePadding: false, label: 'سعر الوحدة' },
    { id: 'quantityValue', numeric: true, disablePadding: false, label: 'الكمية الافتراضية' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TProduct) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}


function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof TProduct) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="checkbox" align="center" variant="head">
                    تحكم
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 auto',
        },
    }),
);

interface EnhancedTableToolbarProps {
    selectedIds: string[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const dispatch = useDispatch();

    const isLoadingProducts = useSelector((state: AppState) => state.bundles.isLoadingProducts);
    const products = useSelector((state: AppState) => state.bundles.products);

    const { selectedIds } = props;
    const [openAddNewProduct, setOpenAddNewProduct] = useState(false);
    const [showVisableToggle, setShowVisableToggle] = useState(false);
    const [selectredProduct, setSelectredProduct] = useState<TProduct[]>([]);


    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });


    const toggleOpenAddNewProduct = () => {
        setOpenAddNewProduct((prevOpenAddNewProduct) => !prevOpenAddNewProduct)
    }

    React.useEffect(() => {
        if (isLoadingProducts) {
            setOpenAddNewProduct(false)
        }
    }, [isLoadingProducts])

    React.useEffect(() => {
        const newSelectredProduct = selectedIds.map((pid: string) => products.find((p: TProduct) => p.id?.toString() === pid));
        setSelectredProduct(newSelectredProduct);
        const enabledProductsList = newSelectredProduct.filter((p: TProduct) => p.isAvailableForPurchase);
        setShowVisableToggle(enabledProductsList.length === newSelectredProduct.length)
    }, [selectedIds])

    const handleDeleteProducts = () => {
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد حذف ${selectredProduct.length} المنتجات قائمة المنتجات علي التطبيق`);
        setConfirmDialogSubmit('حذف');
        setOpenConfirmDialog(true);
        const _toggleProduct: () => void = () => {
            dispatch({
                type: BundlesActionTypes.SET_IS_LOADING_PRODUCTS,
                payload: true
            });
            deleteProductsBulk(selectedIds).then(() => {
                loadBundleProducts(dispatch);
                setOpenConfirmDialog(false);
                setConfirmDialogTitle('');
                setConfirmDialogMessage('');
                setConfirmDialogSubmit('');
                setSelectredProduct([])
            })
        }
        setOnSubmit((prev) => _toggleProduct)
    }
    const handleConfirmDialogCancel: () => void = () => {
        setOpenConfirmDialog(false);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: selectedIds.length > 0,
            })}
        >
            {selectedIds.length > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {selectedIds.length} محدد
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    مجموعات المنتجات
                </Typography>
            )}
            {selectedIds.length > 0 ? (
                <>
                    {/* {showVisableToggle && <Tooltip title="أخفاء">
                        <IconButton aria-label="hide">
                            <VisibilityOffIcon />
                        </IconButton>
                    </Tooltip>} */}
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={handleDeleteProducts}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="إضافة مجموعة جديدة">
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<AddIcon />}
                        onClick={toggleOpenAddNewProduct}
                    >
                        <Typography noWrap>
                            إضافة جديد
                    </Typography>
                    </Button>
                </Tooltip>
            )}
            <ConfirmDialog
                title={confirmDialogTitle}
                message={confirmDialogMessage}
                sumbit={confirmDialogSubmit}
                onCancel={handleConfirmDialogCancel}
                onSubmit={onSubmit}
                open={openConfirmDialog}
            />
            <Drawer
                variant="temporary"
                open={openAddNewProduct}
                anchor="right"
            >
                <BundleForm toggleOpenBundleForm={toggleOpenAddNewProduct} mode={UI_FROM_MODE.NEW} />

            </Drawer>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        noItemsText: {
            width: "100%",
            height: "400px",
        }
    }),
);

export default function BundlesProducts() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TProduct>('arName');
    const [selected, setSelected] = React.useState<string[]>([]);

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [fromMode, setFromMode] = useState(UI_FROM_MODE.NEW);

    const isLoadingProducts = useSelector((state: AppState) => state.bundles.isLoadingProducts);
    const products = useSelector((state: AppState) => state.bundles.products);

    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });

    const [openProductDetails, setOpenProductDetails] = useState(false)
    const toggleOpenProductDetails = () => {
        setOpenProductDetails((prevOpenProductDetails) => !prevOpenProductDetails)
    }

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TProduct) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = products.map((n: TProduct) => (n.id as number).toString());
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, row: TProduct) => {
        const rowId = row.id as number;
        const selectedIndex = selected.indexOf(rowId.toString());
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, rowId.toString());
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenBundleFormOnClick = (product: TProduct, mode: UI_FROM_MODE) => {
        dispatch({
            type: BundlesActionTypes.SET_SELECTED_PRODUCT,
            payload: product
        })
        setFromMode(mode)
        toggleOpenProductDetails()
    };

    const isSelected = (row: TProduct) => selected.indexOf((row.id as number).toString()) !== -1;


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);
    React.useEffect(() => {
        if (isLoadingProducts) {
            setOpenProductDetails(false);
            setSelected([])
        }
    }, [isLoadingProducts])
    React.useEffect(() => {
        dispatch({
            type: BundlesActionTypes.SET_IS_LOADING_PRODUCTS,
            payload: true
        })
        loadBundleProducts(dispatch);
    }, [])


    const handleToggleProduct: (product: TProduct) => void = (product) => {
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد ${product.isAvailableForPurchase ? 'اخفاء' : 'إظهار'} المنتج "${product.arName}"  ${product.isAvailableForPurchase ? 'من' : 'في'} قائمة المنتجات علي التطبيق`);
        setConfirmDialogSubmit(`${product.isAvailableForPurchase ? 'اخفاء' : 'إظهار'}`);
        setOpenConfirmDialog(true);
        const _toggleProduct: () => void = () => {
            dispatch({
                type: BundlesActionTypes.SET_IS_LOADING_PRODUCTS,
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

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar selectedIds={selected} />
                {isLoadingProducts ? (<LoadingIndicator width="100%" height="400px" />)
                    : (
                        <>
                            {products.length > 0 ?
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="tableTitle"
                                        size={dense ? 'small' : 'medium'}
                                        aria-label="enhanced table"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={products.length}
                                        />
                                        <TableBody>
                                            {/* {stableSort(products, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                                            {products.map((row: TProduct, index: number) => {
                                                const isItemSelected = isSelected(row);
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        selected={isItemSelected}

                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                onClick={(event) => handleClick(event, row)}
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                                            {row.arName}
                                                        </TableCell>
                                                        <TableCell align="left"><Avatar variant="square">
                                                            {row.thumbnailBase64 ? <CardMedia
                                                                // className={classes.cover}
                                                                component="img"
                                                                image={`data:image/png;base64,${row.thumbnailBase64}`}
                                                                title="Main Product Image"
                                                            /> : <ImageIcon />}
                                                        </Avatar></TableCell>
                                                        <TableCell align="left"><Avatar variant="square">
                                                            {row.thumbnailBase64 ? <CardMedia
                                                                // className={classes.cover}
                                                                component="img"
                                                                image={`data:image/png;base64,${row.thumbnailBase64}`}
                                                                title="Main Product Image"
                                                            /> : <ImageIcon />}
                                                        </Avatar></TableCell>
                                                        <TableCell align="left">{row.unitPrice}</TableCell>
                                                        <TableCell align="left">{row.quantityValue}</TableCell>
                                                        <TableCell align="center">
                                                            {selected.length <= 0 &&
                                                                <Box display="flex">
                                                                    <Tooltip title="إخفاء">
                                                                        <IconButton aria-label="إخفاء" onClick={() => handleToggleProduct(row)}>
                                                                            {row.isAvailableForPurchase ? <VisibilityOffIcon color="primary" /> : <VisibilityIcon color="primary" />}
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="تعديل">
                                                                        <IconButton aria-label="تعديل" onClick={() => handleOpenBundleFormOnClick(row, UI_FROM_MODE.EDIT)} >
                                                                            <EditIcon color="primary" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="عرض التفاصيل" onClick={() => handleOpenBundleFormOnClick(row, UI_FROM_MODE.VIEW)} >
                                                                        <IconButton aria-label="عرض التفاصيل">
                                                                            <ChevronLeftIcon color="secondary" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            }
                                                        </TableCell>

                                                    </TableRow>
                                                );
                                            })}
                                            <ConfirmDialog
                                                title={confirmDialogTitle}
                                                message={confirmDialogMessage}
                                                sumbit={confirmDialogSubmit}
                                                onCancel={handleConfirmDialogCancel}
                                                onSubmit={onSubmit}
                                                open={openConfirmDialog}
                                            />
                                            <Drawer
                                                variant="temporary"
                                                open={openProductDetails}
                                                anchor="right"
                                            >
                                                <BundleForm toggleOpenBundleForm={toggleOpenProductDetails} mode={fromMode} />

                                            </Drawer>
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                                : (<Box className={classes.noItemsText} display="flex" justifyContent="center" alignItems="center">
                                    <Typography>لا يوجد منتجات</Typography>
                                </Box>)}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25 < products.length ? 25 : products.length]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </>
                    )}
            </Paper>
        </div>
    );
}
