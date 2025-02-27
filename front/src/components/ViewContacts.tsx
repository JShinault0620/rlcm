import React, { useState } from 'react'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {ContactsProvider, useContactsContext} from '../context/contacts.tsx'
import CreateModal from './CreateModal'

const ContactsTable: React.FC = () => {
  const { contacts, deleteContact } = useContactsContext()
  const [ showModal, setShowModal ] = useState(false)
  const [ editContactID, setEditContactID ] = useState(-1)

  return (
    <Container>
      <Row><h1 className="text-light text-center mt-3">Contact Manager</h1></Row>
      <Row className="justify-content-center">
        <Col className="my-3 col-auto"><Button onClick={() => {setEditContactID(-1); setShowModal(true)}}>Create</Button></Col>
        <Table className="text-center table-striped table-sm">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                  <td>
                    <Button className="btn-warning" onClick={() => {setEditContactID(contact.id); setShowModal(true)}}>Edit</Button>
                    <Button className="btn-danger" onClick={() => {deleteContact(contact.id)}}>Delete</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>

      <CreateModal show={showModal} handleClose={() => setShowModal(false)} editID={editContactID}/>
    </Container>
  )
}

const ViewContacts: React.FC = () => {
  return (
    <ContactsProvider>
      <ContactsTable/>
    </ContactsProvider>
  )
}

export default ViewContacts
