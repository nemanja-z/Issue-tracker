import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddRole from './AddRole';
import PropTypes from 'prop-types';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ModalRole = ({project, users}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
    <FontAwesomeIcon icon={faUsers} /> Add member
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Add user to project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddRole show={show} setShow={setShow} project={project} users={users}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}
ModalRole.propTypes = {
  project: PropTypes.string.isRequired,
  users: PropTypes.array
}
export default ModalRole;