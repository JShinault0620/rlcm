import React from 'react'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {ContactsProvider, useContactsContext} from '../context/contacts.tsx'

const ContactsTable: React.FC = () => {
  const { contacts, addContact, deleteContact } = useContactsContext()

  return (
    <Container>
      <ContactsProvider>
        <Row className="justify-content-center">
          <Col className="my-3 col-auto"><Button onClick={() => addContact({firstName: 'Test', lastName: 'TestLast', phoneNumber: '123123123', email: 'test@email.com12'})}>Create</Button></Col>
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
      </ContactsProvider>
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
