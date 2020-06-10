/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_ExpECM_GroupClass_AssignmentTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_ExpECM_GroupClass_AssignmentTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new ExpECM__GroupClass_Assignment__c());
    }
}