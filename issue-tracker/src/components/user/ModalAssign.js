import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AssignUser from './AssignUser';
import PropTypes from 'prop-types';
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalAssign = ({project, issue}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
    <FontAwesomeIcon icon={faPlus} /> Assign
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Assign User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AssignUser show={show} setShow={setShow} project={project} issue={issue}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}
ModalAssign.propTypes = {
  project:PropTypes.string.isRequired,
  issue:PropTypes.string.isRequired
}
export default ModalAssign;