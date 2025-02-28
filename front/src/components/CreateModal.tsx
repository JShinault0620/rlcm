import React, { useState, useEffect } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { ContactsProvider, useContactsContext } from '../context/contacts.tsx'

interface ModalProps {
    show: boolean
    handleClose: () => void
    editID: number
}

const CreateModal: React.FC<ModalProps> = ({ show, handleClose, editID }) => {
    const { selectContact, addContact, selectedContact, editContact } = useContactsContext()
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
        selectContact(editID)

        setFirstName(selectedContact.firstName)
        setLastName(selectedContact.lastName)
        setPhoneNumber(selectedContact.phoneNumber)
        setEmail(selectedContact.email)

        editID === -1 ? setTitleText('Create Contact') : setTitleText('Edit Contact')
    }, [editID])

    return (
        <ContactsProvider>
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
                                    value={selectedContact.firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    value={selectedContact.lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={selectedContact.phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    value={selectedContact.email}
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
        </ContactsProvider>
    )
}

export default CreateModal