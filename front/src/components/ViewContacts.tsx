import React, { useState } from 'react'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {ContactsProvider, useContactsContext} from '../context/contacts.tsx'
import CreateModal from './CreateModal'

const ContactsTable: React.FC = () => {
  const { contacts, deleteContact } = useContactsContext()
  const [ showModal, setShowModal ] = useState(false)

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="my-3 col-auto"><Button onClick={() => setShowModal(true)}>Create</Button></Col>
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
                <tr>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                  <td><Button className="btn-danger" onClick={() => {deleteContact(contact.id)}}>Delete</Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>

      <CreateModal show={showModal} handleClose={() => setShowModal(false)}/>
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
