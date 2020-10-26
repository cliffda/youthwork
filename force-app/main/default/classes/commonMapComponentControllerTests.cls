@istest
private class commonMapComponentControllerTests {
	private static final String EMPLOYER_ACCOUNT_RECORD_TYPE_ID = '01241000000fd4GAAQ';
    // This test is all about addresses, make sure we use the same one
    static String street = '3703 Stanley Tolliver Ave';
    static String city = 'Cleveland';
    static String state  = 'OH';
    static String postalCode = '44115';
    static double latitude = 41.498097;
    static double longitude = -81.660564;
    
    @IsTest
    static void getNearbyContacts(){
        /* ********************************************************************
                                EMPLOYER TEST DATA
        ******************************************************************** */
        //
        // Create Employer Account
        //
        Account employerAccountTestRec = new Account();
        employerAccountTestRec.name = 'Employer Account';
        employerAccountTestRec.BillingCity = city;
        employerAccountTestRec.BillingLatitude = latitude;
        employerAccountTestRec.BillingLongitude = longitude;
        employerAccountTestRec.BillingPostalCode = postalCode;
        employerAccountTestRec.BillingState = state;
        employerAccountTestRec.BillingStreet = street;
        employerAccountTestRec.RecordTypeId = EMPLOYER_ACCOUNT_RECORD_TYPE_ID;
        insert employerAccountTestRec;
        System.debug('DBG:Account Info = ' + employerAccountTestRec);

        //
        // Create Program
        //
        ExpECM__Program__c programTestRec = new ExpECM__Program__c();
        programTestRec.Name = 'Program A1';
        programTestRec.ExpECM__Organization__c = employerAccountTestRec.id;
        insert programTestRec;
        System.debug('DBG:Program = ' + programTestRec);

        //
        // Create Job Order 1
        //       
        ExpECM__Job_Order__c jobOrderTestRec = new ExpECM__Job_Order__c();
        jobOrderTestRec.Program__c = programTestRec.id;
        jobOrderTestRec.ExpECM__Organization__c = employerAccountTestRec.id;
        insert jobOrderTestRec;
        System.debug('DBG:Job Order = ' + jobOrderTestRec);

        //
        // Create Job Order 2
        //       
        jobOrderTestRec.id = null;
        jobOrderTestRec.Duties_Skills__c = 'Lorem ipsum';
        insert jobOrderTestRec;
        System.debug('DBG:Job Order = ' + jobOrderTestRec);

        /* ********************************************************************
                                CLIENT TEST DATA 1
        ******************************************************************** */        
        //
        // Create Client Account
        //
        Account clientAccountTestRec = new Account();
        clientAccountTestRec.name = 'Client Account';
        clientAccountTestRec.BillingCity = city;
        clientAccountTestRec.BillingLatitude = latitude;
        clientAccountTestRec.BillingLongitude = longitude;
        clientAccountTestRec.BillingPostalCode = postalCode;
        clientAccountTestRec.BillingState = state;
        clientAccountTestRec.BillingStreet = street;
        clientAccountTestRec.RecordTypeId = EMPLOYER_ACCOUNT_RECORD_TYPE_ID;
        insert clientAccountTestRec;
        System.debug('DBG:Account Info = ' + clientAccountTestRec);

        //
        // Create Client Contact
        //
        Contact contactRecTestRec = new Contact();
        contactRecTestRec.LastName = 'Contact A1 for Account A1';
        contactRecTestRec.AccountId = clientAccountTestRec.id;
        contactRecTestRec.MailingCity = city;
        contactRecTestRec.MailingStreet = street;
        contactRecTestRec.MailingStreet = state;
        contactRecTestRec.MailingPostalCode = postalCode;
        contactRecTestRec.MailingLatitude = latitude;
        contactRecTestRec.MailingLongitude = longitude;
        insert contactRecTestRec;
        System.debug('DBG:Contact Info = ' + contactRecTestRec);

        //
        // Create Client Case Record
        //      
        ExpECM__Case_Record__c caseRecTestRec = new ExpECM__Case_Record__c();  
        caseRecTestRec.ExpECM__Main_Client__c = contactRecTestRec.id;
        caseRecTestRec.ExpECM__Organization__c	= clientAccountTestRec.Id;
        caseRecTestRec.ExpECM__Program__c = programTestRec.id;
        caseRecTestRec.Work_Experience_Status__c = 'Approved for Placement';
        caseRecTestRec.ExpECM__Status__c = 'Validated';
        caseRecTestRec.ExpECM__Applied_Date__c = system.today();
        insert caseRecTestRec;
        System.debug('DBG:Case Record = ' + caseRecTestRec);


        /* ********************************************************************
                                CLIENT TEST DATA 2
        ******************************************************************** */        
        //
        // Create Client Contact
        //
        contactRecTestRec.id = null;
        contactRecTestRec.ExpECM__Due_Date__c = System.today();
        insert contactRecTestRec;
        System.debug('DBG2:Contact Info = ' + contactRecTestRec);

        //
        // Create Client Case Record
        //      
        caseRecTestRec.id = null;
        caseRecTestRec.ExpECM__Main_Client__c = contactRecTestRec.id;
        insert caseRecTestRec;
        System.debug('DBG2:Case Record = ' + caseRecTestRec);



        /* ********************************************************************
                                BEGIN TEST 1
        ******************************************************************** */               
        ExpECM__Job_Order__c jobOrder = [Select Program__c,
                                                BillingLatitude__c, 
                                                BillingLongitude__c
                                        from    ExpECM__Job_Order__c 
                                        where id = :jobOrderTestRec.id];
        System.debug('Job Order='+ jobOrder);

        String testResult = commonMapComponentController.getNearbyContacts(10, 
                                                        jobOrder.Program__c, 
                                                        jobOrder.BillingLatitude__c, 
                                                        jobOrder.BillingLongitude__c, 
                                                        10);

        System.debug(testResult);

        // Make sure we found a matching record
        System.assert(testResult.length()> 0);

        /* ********************************************************************
                                BEGIN TEST 2
        ******************************************************************** */               
        ExpECM__Case_Record__c caseRec =    [Select ExpECM__Program__c,
                                                    Client_Mailing_Latitude__c, 
                                                    Client_Mailing_Longitude__c
                                            from    ExpECM__Case_Record__c 
                                            where id = :caseRecTestRec.id];
        System.debug('Case Record='+ caseRec);

        String testResult2 = commonMapComponentController.getNearbyJobOrders(10, 
                                                        caseRec.ExpECM__Program__c, 
                                                        caseRec.Client_Mailing_Latitude__c, 
                                                        caseRec.Client_Mailing_Longitude__c, 
                                                        10);

        System.debug(testResult2);

        // Make sure we found a matching record
        System.assert(testResult2.length()> 0);

    }
    
}
