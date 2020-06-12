@istest (SeeAllData=true) 
// We're letting the test see all live data in the org because setting up test data is a challenge given
// all the validation rules, necessaryrelated records, and the geocoding reqirement.
private class MapComponentTests {
    @IsTest
    static void jobOrderComponentControllerTest(){
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

        String testResult = JobOrderComponentController.getNearbyContacts(10, 
                                                        jobOrder.Program__c, 
                                                        jobOrder.BillingLatitude__c, 
                                                        jobOrder.BillingLongitude__c, 
                                                        10);

        System.debug(testResult);

        System.assert(testResult.length()> 0);
    }

}
