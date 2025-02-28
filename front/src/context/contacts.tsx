import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react'

interface Contact {
    id?: any
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
}

interface ContactContextType {
    contacts: Contact[]
    addContact: (contact: Contact) => void
    editContact: (contact: Contact) => void
    deleteContact: (id: number) => void
    getContact: (getID: number) => Contact
}

const ContactsContext = createContext<ContactContextType | undefined>(undefined)

export const ContactsProvider : React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([])

    const refreshContacts = () => {
        fetch('/api/contacts.cfc?method=getcontacts')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('There was a problem fetching the contact list.')
                }
                return res.json()
            })
            .then((data) => {
                setContacts(JSON.parse(data).map((c: any ) => {
                    return {
                        id: c.ID,
                        firstName: c.FIRSTNAME,
                        lastName: c.LASTNAME,
                        phoneNumber: c.PHONENUMBER,
                        email: c.EMAIL
                    }
                }))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        refreshContacts()
    },[])

    const addContact = (contact: Contact) => {
        fetch('/api/contacts.cfc?method=addcontact', {
            method: 'POST',
            body: JSON.stringify(contact)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('There was a problem creating a new contact.')
                }
                return res.json()
            })
            .then((data) => {
                setContacts((existingContacts) => {
                    return [ ...existingContacts, { ...contact, id: JSON.parse(data).ID } ]
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const editContact = (contact: Contact) => {
        fetch('/api/contacts.cfc?method=addcontact', {
            method: 'POST',
            body: JSON.stringify(contact)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('There was a problem creating a new contact.')
                }
                return res.json()
            })
            .then((data) => {
                setContacts(contacts.map(c => c.id === data.ID ? contact : c))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const deleteContact = (id: number) => {
        setContacts(existingContacts => existingContacts.filter(contact => contact.id !== id))
    }

    const getContact = (getID: number): Contact => {
        return contacts.find(c => c.id === getID) || { id: -1, firstName: '', lastName: '', phoneNumber: '', email: '' }
    }

    return (
        <ContactsContext.Provider value={{ contacts, addContact, editContact, deleteContact, getContact }}>
            { children }
        </ContactsContext.Provider>
    )
}

export const useContactsContext = () => {
    const context = useContext(ContactsContext)

    if(!context) {
        throw new Error (
            "useContactContext has to be used within <ContactsContext.Provider>"
        )
    }

    return context
}