import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import ProjectForm from "./ProjectForm";
import Button from "react-bootstrap/Button";

const ModalProject = ({history, leader}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
    <>
    <Button onClick={handleShow}>
      Create new project
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Create new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ProjectForm history={history} leader={leader} show={show} setShow={setShow}/>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
            <Modal.Footer>Close</Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default ModalProject;