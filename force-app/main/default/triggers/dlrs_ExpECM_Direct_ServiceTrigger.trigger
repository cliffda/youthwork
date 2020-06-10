/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_ExpECM_Direct_ServiceTrigger on ExpECM__Direct_Service__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(ExpECM__Direct_Service__c.SObjectType);
}