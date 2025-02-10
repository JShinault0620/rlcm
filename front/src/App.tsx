import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [contacts, setContacts] = useState([
    {
      firstName: 'Jonny',
      lastName: 'Shin',
      phoneNumber: '123-456-7890',
      email: 'test@email.com'
    },
    {
      firstName: 'Random',
      lastName: 'Person',
      phoneNumber: '349-324-1421',
      email: 'random@gmail.com'
    }
  ])

  return (
      <div className="container-fluid vh-100 bg-dark text-light">
        {contacts.map((contact) => {
          let firstName = contact.firstName
          let lastName = contact.lastName
          let phoneNumber = contact.phoneNumber
          let email = contact.email
          return (
            <div className="row">
              <div className="row justify-content-center text-dark">
                <div className="col-auto bg-light text-end rounded">
                  <p>{lastName}, {firstName}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-12 text-center">
                  <p>{phoneNumber}</p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-auto text-center">
                  <p>{email}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
  )
}

export default App
