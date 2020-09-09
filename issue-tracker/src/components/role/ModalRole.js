import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddRole from './AddRole';

const ModalRole = ({project}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
      Add Role
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Add User to Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddRole project={project}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default ModalRole;