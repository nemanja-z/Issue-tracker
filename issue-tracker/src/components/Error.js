import React from "react";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';


const Error = ({error, variant}) => {
    const show = error ? 
    <Alert variant={variant??'warning'}>
        <Alert.Heading>
            {error}
        </Alert.Heading>
    </Alert> : null;

    return(<Card>
            {show}
            </Card>
    )
}
Error.propTypes = {
    error: PropTypes.string,
    variant: PropTypes.string
}

export default Error;