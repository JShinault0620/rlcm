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

    <cffunction name="addcontact" returntype="string" returnformat="JSON" output="false" access="remote">
        <cfset local.newContact = deserializeJSON(getHttpRequestData().content)>

        <cftransaction>
            <cfquery name="local.insertContact" datasource="ContactManager">
                insert into contactmanager.contacts (firstname, lastname, phonenumber, email)
                values (
                    <cfqueryparam cfsqltype="cf_sql_varchar" value="#local.newContact.firstName#">,
                    <cfqueryparam cfsqltype="cf_sql_varchar" value="#local.newContact.lastName#">,
                    <cfqueryparam cfsqltype="cf_sql_varchar" value="#local.newContact.phoneNumber#">,
                    <cfqueryparam cfsqltype="cf_sql_varchar" value="#local.newContact.email#">
                )
            </cfquery>

            <cfquery name="local.newId" datasource="ContactManager">
                select last_insert_id() as id
            </cfquery>
        </cftransaction>

        <cfreturn serializeJSON({id: local.newId.id})>
    </cffunction>

    <cffunction name="updatecontact" returntype="string" returnformat="JSON" output="false" access="remote">
        <cfset local.updatedContact = deserializeJSON(getHttpRequestData().content)>

        <cfquery name="local.updateContact" datasource="ContactManager">
            update contactmanager.contacts
            set
                firstname=<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.updatedContact.firstName#">,
                lastname=<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.updatedContact.lastName#">,
                phonenumber=<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.updatedContact.phoneNumber#">,
                email=<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.updatedContact.email#">
            where id=<cfqueryparam cfsqltype="cf_sql_integer" value="#local.updatedContact.id#">
        </cfquery>

        <cfreturn serializeJSON({id: local.updatedContact.id})>
    </cffunction>

    <cffunction name="getcontactbyid" returntype="string" returnformat="JSON" output="false" access="remote">
        <cfargument name="contactId" required="true">

        <cfquery name="local.selectContact" datasource="ContactManager">
            select id, firstname, lastname, phonenumber, email
            from contactmanager.contacts
            where id=<cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.contactId#">
        </cfquery>

        <cfreturn serializeJSON({
            id: local.selectContact.id,
            firstName: local.selectContact.firstname,
            lastName: local.selectContact.lastname,
            phoneNumber: local.selectContact.phonenumber,
            email: local.selectContact.email
        })>
    </cffunction>

    <cffunction name="deletecontact" returntype="string" returnformat="JSON" output="false" access="remote">
        <cfargument name="contactId" required="true">

        <cfquery name="local.deleteContact" datasource="ContactManager">
            delete 
            from contactmanager.contacts
            where id=<cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.contactId#">
        </cfquery>

        <cfreturn serializeJSON({id: arguments.contactId})>
    </cffunction>
</cfcomponent>