import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


interface Props {
    width?: string;
    height?: string;
}

const LoadingIndicator = (props: Props) => {
    const { width, height } = props;
    return (
        <div style={{ width: width || "100%", height: height || "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </div>
    )
}

export default LoadingIndicator
