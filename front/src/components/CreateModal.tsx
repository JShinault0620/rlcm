import {Modal, Button} from 'react-bootstrap'

const CreateModal = () => {
    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Create Contact</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default CreateModal