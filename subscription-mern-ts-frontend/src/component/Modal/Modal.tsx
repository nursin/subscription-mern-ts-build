import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useState } from 'react'


interface ModalProps {
    text: string;
    variant: "primary" | "danger";
}

function ModalComponent({ text, variant }: ModalProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={variant} onClick={handleShow} size="lg" style={{marginRight: "1rem", padding: "0.2rem 2rem"}}>{text}</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        {text}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email</InputGroup.Text>
                        <FormControl
                            type="email"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Password</InputGroup.Text>
                        <FormControl
                            type="password"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary'>{text}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalComponent