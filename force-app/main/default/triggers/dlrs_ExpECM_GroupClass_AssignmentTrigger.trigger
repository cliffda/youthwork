/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_ExpECM_GroupClass_AssignmentTrigger on ExpECM__GroupClass_Assignment__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(ExpECM__GroupClass_Assignment__c.SObjectType);
}