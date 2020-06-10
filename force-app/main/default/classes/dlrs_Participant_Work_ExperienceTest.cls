/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Participant_Work_ExperienceTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Participant_Work_ExperienceTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Participant_Work_Experience__c());
    }
}