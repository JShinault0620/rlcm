import React, { useState, useEffect } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { useContactsContext } from '../context/contacts.tsx'

interface ModalProps {
    show: boolean
    handleClose: () => void
    editID: number
}

const CreateModal: React.FC<ModalProps> = ({ show, handleClose, editID }) => {
    const { addContact, getContact, editContact } = useContactsContext()
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ titleText, setTitleText ] = useState('Create Contact')

    const handleSubmit = () => {
        const inputContact = { id: editID, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email }
        if (!firstName || !lastName || !phoneNumber || !email) return

        inputContact.id === -1 ? addContact(inputContact) : editContact(inputContact)
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setEmail('')

        handleClose()
    }

    useEffect(() => {
        const fillContact = getContact(editID)

        setFirstName(fillContact.firstName)
        setLastName(fillContact.lastName)
        setPhoneNumber(fillContact.phoneNumber)
        setEmail(fillContact.email)

        editID === -1 ? setTitleText('Create Contact') : setTitleText('Edit Contact')
    }, [editID])

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{titleText}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateModal