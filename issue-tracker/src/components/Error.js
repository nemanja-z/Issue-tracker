import React from "react";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';


const Error = ({error}) => {
    
    const show = error ? 
    <Alert variant={'warning'}>
        <Alert.Heading>
            {error}
        </Alert.Heading>
    </Alert> : null;

    return(<Card>
            {show}
            </Card>
    )
}

export default Error;