import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { UI_FROM_MODE } from '../../models/configs';
import { AppState } from '../../redux/store';


const useStyles = makeStyles((theme: Theme) => ({
}));


interface Props {
    open: boolean;
    handleClose: () => void;
    mode: UI_FROM_MODE,
}

const BranchesDetailsForm = (props: Props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { open, handleClose, mode } = props;

    return (
        <div>
            BranchesDetailsForm
        </div>
    )
}

export default BranchesDetailsForm
