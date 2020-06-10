/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Job_PositionTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Job_PositionTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Job_Position__c());
    }
}