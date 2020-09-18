@istest
// We're letting the test see all live data in the org because setting up test data is a challenge given
// all the validation rules, necessaryrelated records, and the geocoding reqirement.
private class commonMapComponentControllerTests {
    @IsTest
    // commonMapComponentControllerTests.getNearbyContacts();

    static void getNearbyContacts(){
        Savepoint sp = Database.setSavepoint();

        Account acct1 = new Account();
        acct1.name = 'Account A1';
        acct1.BillingCity = 'Cleveland';
        acct1.BillingLatitude = 41.498097;
        acct1.BillingLongitude = -81.660564;
        acct1.BillingPostalCode = '44115';
        acct1.BillingState = 'OH';
        acct1.BillingStreet = '3703 Stanley Tolliver Ave';
        acct1.RecordTypeId = '01241000000fd4GAAQ';
        insert acct1;
        System.debug('DBG:Account Info = ' + acct1);

        Contact c1 = new Contact();
        c1.LastName = 'Contact A1 for Account A1';
        c1.AccountId = acct1.id;
        insert c1;
        System.debug('DBG:Contact Info = ' + c1);


        ExpECM__Program__c p1 = new ExpECM__Program__c();
        p1.Name = 'Program A1';
        insert p1;
        System.debug('DBG:Program = ' + p1);

        
        ExpECM__Case_Record__c caseRec = new ExpECM__Case_Record__c();
        caseRec.ExpECM__Main_Client__c = c1.id;
        caseRec.ExpECM__Organization__c	= acct1.Id;
        caseRec.ExpECM__Program__c = p1.id;
        insert caseRec;
        System.debug('DBG:Case Record = ' + caseRec);


        Database.rollback(sp);

        // Set a Job Order to use for the test.  If the test is failing it's likely due to this record.
        // When running the test make sure the id is for an existing job record that has matching
        // Case Records.
        String jobOrderId = 'a572M00000097jNQAQ';
        ExpECM__Job_Order__c jobOrder = [Select Program__c,
                                                BillingLatitude__c, 
                                                BillingLongitude__c
                                        from    ExpECM__Job_Order__c 
                                        where id = :jobOrderId];
        System.debug('Job Order='+ jobOrder);

        String testResult = commonMapComponentController.getNearbyContacts(10, 
                                                        jobOrder.Program__c, 
                                                        jobOrder.BillingLatitude__c, 
                                                        jobOrder.BillingLongitude__c, 
                                                        10);

        System.debug(testResult);

        System.assert(testResult.length()> 0); */
    }

}
