import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import ChangeStatus from "./ChangeStatus";
import Button from "react-bootstrap/Button";

const ModalStatus = ({ projectId}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
      Edit project status
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Edit project status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ChangeStatus show={show} setShow={setShow} projectId={projectId}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default ModalStatus;