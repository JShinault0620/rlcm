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
    selectedContact: Contact
    addContact: (contact: Contact) => void
    editContact: (contact: Contact) => void
    deleteContact: (id: number) => void
    selectContact: (getID: number) => void
}

const ContactsContext = createContext<ContactContextType | undefined>(undefined)

export const ContactsProvider : React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [selectedContact, setSelectedContact] = useState<Contact>({ id: -1, firstName: '', lastName: '', phoneNumber: '', email: '' })

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
                    throw new Error('There was a problem updating the contact.')
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

    const selectContact = async (getID: number) => {
        if (getID !== -1) {
            let res = await fetch(`/api/contacts.cfc?method=getcontactbyid&contactID=${getID}`)
            if (!res.ok) {
                throw new Error('There was a problem creating a new contact.')
            }

            let data = await res.json()

            let jsonData = await JSON.parse(data)
        
            setSelectedContact({ 
                id: jsonData.ID,
                firstName: jsonData.FIRSTNAME,
                lastName: jsonData.LASTNAME,
                phoneNumber: jsonData.PHONENUMBER,
                email: jsonData.EMAIL
            })
        } else {
            setSelectedContact({ id: -1, firstName: '', lastName: '', phoneNumber: '', email: '' })
        }
    }
    return (
        <ContactsContext.Provider value={{ contacts, selectedContact, selectContact,  addContact, editContact, deleteContact }}>
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