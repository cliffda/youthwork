/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_ExpECM_Direct_ServiceTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_ExpECM_Direct_ServiceTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new ExpECM__Direct_Service__c());
    }
}