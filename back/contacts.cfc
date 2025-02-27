<cfcomponent>
    <cffunction name="getcontacts" returntype="string" returnformat="JSON" output="false" access="remote">
        <cfquery name="local.selectContacts" datasource="ContactManager">
            select id, firstname, lastname, phonenumber, email
            from contactmanager.contacts
        </cfquery>

        <cfset local.returnContacts = []>

        <cfif queryRecordCount(local.selectContacts)>
            <cfoutput query="local.selectContacts">
                <cfset arrayAppend(local.returnContacts, {
                    id = local.selectContacts.id,
                    firstName = "#local.selectContacts.firstname#",
                    lastName = "#local.selectContacts.lastname#",
                    phoneNumber = "#local.selectContacts.phonenumber#",
                    email = "#local.selectContacts.email#"
                })>
            </cfoutput>
        </cfif>

        <cfreturn serializeJSON(local.returnContacts)>
    </cffunction>
</cfcomponent>