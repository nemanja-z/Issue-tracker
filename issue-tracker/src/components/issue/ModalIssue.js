import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import IssueForm from "./IssueForm";
import Button from "react-bootstrap/Button";

const ModalIssue = ({id}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
      Report an issue
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Report an issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <IssueForm show={show} setShow={setShow} id={id}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default ModalIssue;