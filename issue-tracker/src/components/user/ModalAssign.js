import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AssignUser from './AssignUser';
import PropTypes from 'prop-types';


const ModalAssign = ({project, issue}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
      Assign User
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
  project:PropTypes.object.isRequired,
  issue:PropTypes.object.isRequired
}
export default ModalAssign;