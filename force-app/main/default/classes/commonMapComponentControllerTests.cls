@istest
// We're letting the test see all live data in the org because setting up test data is a challenge given
// all the validation rules, necessaryrelated records, and the geocoding reqirement.
private class commonMapComponentControllerTests {
    
    @IsTest
    static void getNearbyContacts(){

        // This test is all about addresses, make sure we use the same one
        String street = '3703 Stanley Tolliver Ave';
        String city = 'Cleveland';
        String state  = 'OH';
        String postalCode = '44115';
        double latitude = 41.498097;
        double longitude = -81.660564;

        /* ********************************************************************
                                EMPLOYER TEST DATA
        ******************************************************************** */
        //
        // Create Employer Account
        //
        Account employerAccount = new Account();
        employerAccount.name = 'Employer Account';
        employerAccount.BillingCity = city;
        employerAccount.BillingLatitude = latitude;
        employerAccount.BillingLongitude = longitude;
        employerAccount.BillingPostalCode = postalCode;
        employerAccount.BillingState = state;
        employerAccount.BillingStreet = street;
        employerAccount.RecordTypeId = '01241000000fd4GAAQ';
        insert employerAccount;
        System.debug('DBG:Account Info = ' + employerAccount);

        //
        // Create Program
        //
        ExpECM__Program__c program1 = new ExpECM__Program__c();
        program1.Name = 'Program A1';
        program1.ExpECM__Organization__c = employerAccount.id;
        insert program1;
        System.debug('DBG:Program = ' + program1);

         //
        // Create Job Order
        //       
        ExpECM__Job_Order__c jobOrder1 = new ExpECM__Job_Order__c();
        jobOrder1.Program__c = program1.id;
        jobOrder1.ExpECM__Organization__c = employerAccount.id;
        insert jobOrder1;
        System.debug('DBG:Job Order = ' + jobOrder1);

        /* ********************************************************************
                                CLIENT TEST DATA
        ******************************************************************** */        
        //
        // Create Client Account
        //
        Account clientAccount = new Account();
        clientAccount.name = 'Client Account';
        clientAccount.BillingCity = city;
        clientAccount.BillingLatitude = latitude;
        clientAccount.BillingLongitude = longitude;
        clientAccount.BillingPostalCode = postalCode;
        clientAccount.BillingState = state;
        clientAccount.BillingStreet = street;
        clientAccount.RecordTypeId = '01241000000fd4GAAQ';
        insert clientAccount;
        System.debug('DBG:Account Info = ' + clientAccount);

        //
        // Create Client Contact
        //
        Contact contact1 = new Contact();
        contact1.LastName = 'Contact A1 for Account A1';
        contact1.AccountId = clientAccount.id;
        contact1.MailingCity = city;
        contact1.MailingStreet = street;
        contact1.MailingStreet = state;
        contact1.MailingPostalCode = postalCode;
        contact1.MailingLatitude = latitude;
        contact1.MailingLongitude = longitude;
        insert contact1;
        System.debug('DBG:Contact Info = ' + contact1);

        //
        // Create Client Case Record
        //      
        ExpECM__Case_Record__c caseRec1 = new ExpECM__Case_Record__c();  
        caseRec1.ExpECM__Main_Client__c = contact1.id;
        caseRec1.ExpECM__Organization__c	= clientAccount.Id;
        caseRec1.ExpECM__Program__c = program1.id;
        caseRec1.Work_Experience_Status__c = 'Approved for Placement';
        caseRec1.ExpECM__Status__c = 'Validated';
        insert caseRec1;
        System.debug('DBG:Case Record = ' + caseRec1);

        /* ********************************************************************
                                BEGIN TEST 1
        ******************************************************************** */               
        ExpECM__Job_Order__c jobOrder = [Select Program__c,
                                                BillingLatitude__c, 
                                                BillingLongitude__c
                                        from    ExpECM__Job_Order__c 
                                        where id = :jobOrder1.id];
        System.debug('Job Order='+ jobOrder);

        String testResult = commonMapComponentController.getNearbyContacts(10, 
                                                        jobOrder.Program__c, 
                                                        jobOrder.BillingLatitude__c, 
                                                        jobOrder.BillingLongitude__c, 
                                                        10);

        System.debug(testResult);

        System.assert(testResult.length()> 0);

        /* ********************************************************************
                                BEGIN TEST 2
        ******************************************************************** */               
        ExpECM__Case_Record__c caseRec =    [Select ExpECM__Program__c,
                                                    Client_Mailing_Latitude__c, 
                                                    Client_Mailing_Longitude__c
                                            from    ExpECM__Case_Record__c 
                                            where id = :caseRec1.id];
        System.debug('Case Record='+ caseRec);

        String testResult2 = commonMapComponentController.getNearbyJobOrders(10, 
                                                        caseRec.ExpECM__Program__c, 
                                                        caseRec.Client_Mailing_Latitude__c, 
                                                        caseRec.Client_Mailing_Longitude__c, 
                                                        10);

        System.debug(testResult2);

        System.assert(testResult2.length()> 0);

    }
    
}
