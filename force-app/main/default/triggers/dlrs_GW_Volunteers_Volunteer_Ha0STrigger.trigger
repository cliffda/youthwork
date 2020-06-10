/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_GW_Volunteers_Volunteer_Ha0STrigger on GW_Volunteers__Volunteer_Hours__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(GW_Volunteers__Volunteer_Hours__c.SObjectType);
}