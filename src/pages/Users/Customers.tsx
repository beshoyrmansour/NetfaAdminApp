import React, { useState } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
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
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import CardMedia from '@material-ui/core/CardMedia';

import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
// import FilterListIcon from '@material-ui/icons/FilterList';

import { TCustomer, UsersActionTypes } from '../../models/Users';
import CustomerForm from '../../components/users/CustomerForm';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCustomers, deleteCustomer, loadCustomersList } from '../../redux/actions/customersActions';
import LoadingIndicator from '../../components/LoadingIndicator';
import ConfirmDialog from '../../components/ConfirmDialog';


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
    id: keyof TCustomer;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'الإسم' },
    { id: 'email', numeric: false, disablePadding: false, label: 'البريد الالكترونى' },
    { id: 'phoneNumber', numeric: true, disablePadding: false, label: 'رقم التليفون' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TCustomer) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}


function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof TCustomer) => (event: React.MouseEvent<unknown>) => {
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

    const isLoadingCustomers = useSelector((state: AppState) => state.users.isLoadingCustomers);
    const customers = useSelector((state: AppState) => state.users.customers);

    const { selectedIds } = props;
    const [openCustomerForm, setOpenCustomerForm] = useState(false);
    const [showVisableToggle, setShowVisableToggle] = useState(false);
    const [selectredCustomer, setSelectredCustomer] = useState<TCustomer[]>([]);


    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });


    const toggleOpenCustomerForm = () => {
        setOpenCustomerForm((prevOpenCustomerForm) => !prevOpenCustomerForm)
    }

    React.useEffect(() => {
        if (isLoadingCustomers) {
            setOpenCustomerForm(false)
        }
    }, [isLoadingCustomers])

    React.useEffect(() => {
        const newSelectredCustomers = selectedIds.map((pid: string) => customers.find((p: TCustomer) => p.id?.toString() === pid));
        setSelectredCustomer(newSelectredCustomers);
    }, [selectedIds])

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
                    العملاء
                </Typography>
            )}
            {selectedIds.length > 0 ? (
                <>
                    {/* {showVisableToggle && <Tooltip title="أخفاء">
                        <IconButton aria-label="hide">
                            <VisibilityOffIcon />
                        </IconButton>
                    </Tooltip>} */}
                    {/* <Tooltip title="حذف">
                        <IconButton aria-label="delete" onClick={handleDeleteCustomers}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> */}
                </>
            ) : (
                <Tooltip title="إضافة منتج جديد">
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<AddIcon />}
                        onClick={toggleOpenCustomerForm}
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
                open={openCustomerForm}
                anchor="right"
            >
                <CustomerForm open={openCustomerForm} handleClose={toggleOpenCustomerForm} mode={UI_FROM_MODE.NEW} />

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

export default function Customers() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TCustomer>('name');
    const [selected, setSelected] = React.useState<string[]>([]);

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [fromMode, setFromMode] = useState(UI_FROM_MODE.NEW);
    const isLoadingCustomers = useSelector((state: AppState) => state.users.isLoadingCustomers);
    const customers = useSelector((state: AppState) => state.users.customers);


    const [confirmDialogMessage, setConfirmDialogMessage] = React.useState<string>('');
    const [confirmDialogSubmit, setConfirmDialogSubmit] = React.useState<string>('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = React.useState<string>('');
    const [onSubmit, setOnSubmit] = React.useState<() => void>(() => { });


    const [openCustomerDetailsForm, setOpenCustomerDetailsForm] = useState(false)
    const toggleOpenCustomerDetailsForm = () => {
        setOpenCustomerDetailsForm((prevOpenCustomertDetails) => !prevOpenCustomertDetails)
    }



    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TCustomer) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = customers.map((n: TCustomer) => (n.id as number).toString());
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, row: TCustomer) => {
        const rowId = row.id as number;
        const selectedIndex = selected.indexOf(rowId.toString());
        let newSelected: string[] = [];
        let newSelectedCustomers: TCustomer[] = [];
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
    const handleOpenCustomerFormOnClick = (customer: TCustomer, mode: UI_FROM_MODE) => {
        dispatch({
            type: UsersActionTypes.SET_SELECTED_CUSTOMER,
            payload: customer
        })
        setFromMode(mode)
        toggleOpenCustomerDetailsForm()
    };

    const isSelected = (row: TCustomer) => selected.indexOf((row.id as number).toString()) !== -1;


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);
    React.useEffect(() => {
        if (isLoadingCustomers) {
            setOpenCustomerDetailsForm(false);
            setSelected([])
        }
    }, [isLoadingCustomers])

    React.useEffect(() => {
        dispatch({
            type: UsersActionTypes.SET_IS_LOADING_CUSTOMERS,
            payload: true
        })
        loadCustomersList(dispatch);
    }, [])


    const handleDeleteCustomer: (customer: TCustomer) => void = (customer) => {
        setConfirmDialogTitle(`هل أنت متأكد`);
        setConfirmDialogMessage(`هل تريد حذف العميل "${customer.name}"  من قائمة العملاء`);
        setConfirmDialogSubmit(`حذف`);
        setOpenConfirmDialog(true);
        const _deleteCustomer: () => void = () => {
            dispatch({
                type: UsersActionTypes.SET_IS_LOADING_CUSTOMERS,
                payload: true
            });
            deleteCustomer(customer.id as number).then(() => {
                loadCustomersList(dispatch);
                setOpenConfirmDialog(false);
                setConfirmDialogTitle('');
                setConfirmDialogMessage('');
                setConfirmDialogSubmit('');
            })
        }
        setOnSubmit((prev) => _deleteCustomer)
    }




    // const handleChangeCustomerPassword: (customer: TCustomer) => void = (customer) => {
    //     setConfirmDialogTitle(`هل أنت متأكد`);
    //     setConfirmDialogMessage(`برجاء كتابة المة المرور الجديدة للموظف "${customer.name}"`);
    //     setConfirmDialogSubmit(`تغيير`);
    //     setOpenConfirmDialog(true);
    //     const _changeCustomerPassword: () => void = () => {
    //         dispatch({
    //             type: UsersActionTypes.SET_IS_LOADING_CUSTOMERS,
    //             payload: true
    //         });
    //         changeCustomerPassword(customer.id as number).then(() => {
    //             loadCustomersList(dispatch);
    //             setOpenConfirmDialog(false);
    //             setConfirmDialogTitle('');
    //             setConfirmDialogMessage('');
    //             setConfirmDialogSubmit('');
    //         })
    //     }
    //     setOnSubmit((prev) => _changeCustomerPassword)
    // }


    const handleConfirmDialogCancel: () => void = () => {
        setOpenConfirmDialog(false);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar selectedIds={selected} />
                {isLoadingCustomers ? (<LoadingIndicator width="100%" height="400px" />)
                    : (
                        <> {customers.length > 0 ?
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
                                        rowCount={customers.length}
                                    />
                                    <TableBody>
                                        {/* {stableSort(products, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                                        {customers.map((row: TCustomer, index: number) => {
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
                                                        {row.name}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell align="left">{row.phoneNumber}</TableCell>
                                                    <TableCell align="center">
                                                        {selected.length <= 0 &&
                                                            <Box display="flex">
                                                                <Tooltip title={"حذف"}>
                                                                    <IconButton aria-label={"حذف"} onClick={() => handleDeleteCustomer(row)}>
                                                                        <DeleteIcon color="primary" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title={"تغيير كلمة المرور"}>
                                                                    <IconButton aria-label={"تغيير كلمة المرور"} onClick={() => handleOpenCustomerFormOnClick(row, UI_FROM_MODE.EDIT_PASSWORD)}>
                                                                        <VpnKeyIcon color="primary" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="تعديل">
                                                                    <IconButton aria-label="تعديل" onClick={() => handleOpenCustomerFormOnClick(row, UI_FROM_MODE.EDIT)} >
                                                                        <EditIcon color="primary" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="عرض التفاصيل" onClick={() => handleOpenCustomerFormOnClick(row, UI_FROM_MODE.VIEW)} >
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
                                            open={openCustomerDetailsForm}
                                            anchor="right"
                                        >
                                            <CustomerForm open={openCustomerDetailsForm} handleClose={toggleOpenCustomerDetailsForm} mode={fromMode} />

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
                                <Typography>لا يوجد</Typography>
                            </Box>)}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25 < customers.length ? 25 : customers.length]}
                                component="div"
                                count={customers.length}
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
