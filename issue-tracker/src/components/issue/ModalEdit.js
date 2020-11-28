import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditIssue from "./EditIssue";
import PropTypes from 'prop-types';
import { faEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const ModalEdit = ({issue}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
    <FontAwesomeIcon icon={faEdit} /> Edit
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Report an issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <EditIssue issue={issue} show={show} setShow={setShow}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>)



}
ModalEdit.propTypes = {
  issue:PropTypes.object.isRequired
}
export default ModalEdit;