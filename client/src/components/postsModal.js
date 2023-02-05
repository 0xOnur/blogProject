import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PostsModal = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{props.body}</h4>
            <p>
              {props.description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Kapat</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default PostsModal;