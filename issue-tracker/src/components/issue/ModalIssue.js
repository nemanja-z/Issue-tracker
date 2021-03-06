import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import IssueForm from "./IssueForm";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalIssue = ({projectId}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
    <FontAwesomeIcon icon={faPlus} /> Report an issue
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Report an issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <IssueForm projectId={projectId} show={show} setShow={setShow}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}
ModalIssue.propTypes = {
  projectId: PropTypes.string
}
export default ModalIssue;