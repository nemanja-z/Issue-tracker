import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import IssueForm from "./IssueForm";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';


const ModalIssue = ({projectId, id, client}) => {
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
        <IssueForm projectId={projectId} show={show} client={client} setShow={setShow}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}
ModalIssue.propTypes = {
  projectId: PropTypes.string.isRequired, 
  id: PropTypes.string.isRequired, 
  client: PropTypes.object.isRequired
}
export default ModalIssue;