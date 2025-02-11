import React, { ReactNode, createContext, useContext, useState } from 'react'

interface Contact {
    id?: any
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
}

interface ContactContextType {
    contacts: Contact[]
    addContact: (contact: Contact, editID: number) => void
    deleteContact: (id: number) => void
    getContact: (getID: number) => Contact
}

const ContactsContext = createContext<ContactContextType | undefined>(undefined)

export const ContactsProvider : React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([
        {
            id: 0,
            firstName: 'Jonny',
            lastName: 'Shin',
            phoneNumber: '123-456-7890',
            email: 'test@email.com'
        },
        {
            id: 1,
            firstName: 'Random',
            lastName: 'Person',
            phoneNumber: '349-324-1421',
            email: 'random@gmail.com'
        }
    ])

    const addContact = (contact: Contact, editID: number) => {
        if (editID) {
            deleteContact(editID)
        }

        setContacts((existingContacts) => {
            return [ ...existingContacts, { id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 0, ...contact} ] 
        })
    }

    const deleteContact = (id: number) => {
        setContacts(existingContacts => existingContacts.filter(contact => contact.id !== id))
    }

    const getContact = (getID: number): Contact => {
        return contacts.find(c => c.id === getID) || { id: null, firstName: '', lastName: '', phoneNumber: '', email: '' }
    }

    return (
        <ContactsContext.Provider value={{ contacts, addContact, deleteContact, getContact }}>
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