public with sharing class commonMapComponentController {

    // ************************************************************************
    // Get Case Records that a nearby to a given Job Order Record
    // ************************************************************************
    @AuraEnabled(cacheable=true)
    public static String getNearbyContacts(
        Integer proximity,
        String jobOrderProgram,
        Decimal jobOrderLatitude,
        Decimal jobOrderLongitude,
        Integer maxMatchCount
        ) {

        //Can't do Less Than/Equal operation on distance comparison so accomplishing similar comparison by adding 1 to the value specified 
        proximity++;             

        // This defines the list of Case Record information that we'll return to the Lightning Component
        List<Map<String,String>> retVal = new List<Map<String,String>>();

        // Set a local variable that has the geolocation of the Job Order
        Location jobOrderLocation = Location.newInstance(jobOrderLatitude,jobOrderLongitude);

        // Define list to receive the results of the SOQL query
        List<ExpECM__Case_Record__c> caseRecordQueryResult = new List<ExpECM__Case_Record__c>();

        // Run the query
        caseRecordQueryResult = [SELECT Id, Name,
                Client_Mailing_Street__c,
                Client_Mailing_City__c,
                Client_Mailing_State__c,
                Client_Mailing_Zip__c,
                Client_Mailing_Latitude__c,
                Client_Mailing_Longitude__c,
                ExpECM__Status__c,
                Travel_to_Training__c,
                Barriers_to_program_success__c,
                Education_Level__c,
                ExpECM__Main_Client__r.phone,
                ExpECM__Main_Client__r.MailingCity,
                ExpECM__Main_Client__r.MailingPostalCode,
                JobPlacementPriorities__c,
                ExpECM__Main_Client__r.Are_you_pregnant__c,
                ExpECM__Main_Client__r.ExpECM__Due_Date__c,
                ExpECM__Main_Client__r.ExpECM__Preferred_Language__c,
                Has_Computer__c,
                Has_Internet__c,
                Accomodations__c,
                Accomodations_Description__c
        FROM    ExpECM__Case_Record__c
        WHERE   ExpECM__Program__c = :jobOrderProgram
        AND     Work_Experience_Status__c in ('Approved for Placement','Approved for Reassignment')
        AND     ExpECM__Status__c in ('Validated','Pre-enrolled','Enrolled in JRT')
        AND     DISTANCE(ExpECM__Main_Client__r.MailingAddress, :jobOrderLocation, 'mi') < :proximity 
        ORDER BY DISTANCE(ExpECM__Main_Client__r.MailingAddress, :jobOrderLocation, 'mi')
        LIMIT   :maxMatchCount];

        // Spin through each row returned from the SOQL query and peform some additional actions
        for (ExpECM__Case_Record__c currentCaseRecord : caseRecordQueryResult) {
            String dueDate;
            // Each record is going to be converted into a Map 
            // https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_map.htm#apex_methods_system_map
            // The map will contain name/value pairs of field name/field value.  We're using a map so we can add a new calculated field: Distance
            // Each record gets a new Map
            Map<String,String> caseRec = new Map<String, String>{};

            // Get the geolocation of the Case Record
            Location caseRecLocation = Location.newInstance(currentCaseRecord.Client_Mailing_Latitude__c,currentCaseRecord.Client_Mailing_Longitude__c);
            // Calculate the distance in miles between the Case Record andd the Job Order.  This value will eventually be displayed in the 
            // pop-up overlay on the map.
            Double dist = Location.getDistance(caseRecLocation, jobOrderLocation, 'mi');
            
            // The distance value has 8 decimal places.  We need to round it down to one decimal place.
            dist = (dist * 10).round();
            dist = dist / 10;

            // Load the map with data
            caseRec.put('Name', currentCaseRecord.Name);
            caseRec.put('Id', currentCaseRecord.Id);
            caseRec.put('Client_Mailing_Street__c', currentCaseRecord.Client_Mailing_Street__c);
            caseRec.put('Client_Mailing_City__c', currentCaseRecord.Client_Mailing_City__c);
            caseRec.put('Client_Mailing_State__c', currentCaseRecord.Client_Mailing_State__c);
            caseRec.put('Client_Mailing_Zip__c', currentCaseRecord.Client_Mailing_Zip__c);
            caseRec.put('Client_Mailing_Latitude__c', currentCaseRecord.Client_Mailing_Latitude__c.format()); //format() converts numberic format to string
            caseRec.put('Client_Mailing_Longitude__c', currentCaseRecord.Client_Mailing_Longitude__c.format());
            caseRec.put('ExpECM__Status__c', currentCaseRecord.ExpECM__Status__c);
            caseRec.put('Travel_to_Training__c', currentCaseRecord.Travel_to_Training__c);
            caseRec.put('Barriers_to_program_success__c', String.isBlank(currentCaseRecord.Barriers_to_program_success__c) ? 'N/A' : currentCaseRecord.Barriers_to_program_success__c);
            caseRec.put('Education_Level__c', currentCaseRecord.Education_Level__c);
            caseRec.put('JobPlacementPriorities__c', currentCaseRecord.JobPlacementPriorities__c);
            caseRec.put('Has_Computer__c', (currentCaseRecord.Has_Computer__c) ? 'Yes' : 'No');
            caseRec.put('Has_Internet__c', (currentCaseRecord.Has_Internet__c) ? 'Yes' : 'No');
            caseRec.put('Phone', currentCaseRecord.ExpECM__Main_Client__r.phone);
            caseRec.put('Are_you_pregnant__c', currentCaseRecord.ExpECM__Main_Client__r.Are_you_pregnant__c);
            if (currentCaseRecord.ExpECM__Main_Client__r.ExpECM__Due_Date__c == null) {
                dueDate='';
            } else {
                dueDate = currentCaseRecord.ExpECM__Main_Client__r.ExpECM__Due_Date__c.format();
            }
            caseRec.put('ExpECM__Due_Date__c', dueDate);
            caseRec.put('ExpECM__Preferred_Language__c', currentCaseRecord.ExpECM__Main_Client__r.ExpECM__Preferred_Language__c);
            caseRec.put('Accomodations__c', currentCaseRecord.Accomodations__c);
            caseRec.put('Accomodations_Description__c', currentCaseRecord.Accomodations_Description__c);
            caseRec.put('Distance', dist.format());
            
            // Add the map to the list
            retVal.add(caseRec);

        }
        
        //System.debug('RAW=' + retVal);
        //System.debug('JSON=' + JSON.serialize(retVal));
        
        //Return the list of matching Case Records in JSON format
        return JSON.serialize(retVal);
    }

    // ************************************************************************
    // Get Job Orders that a nearby to a given Case Record
    // ************************************************************************
    @AuraEnabled(cacheable=true)
    public static String getNearbyJobOrders(
        Integer proximity,
        String caseRecordProgram,
        Decimal caseRecordLatitude,
        Decimal caseRecordLongitude,
        Integer maxMatchCount
        ) {

        //Can't do Less Than/Equal operation on distance comparison so accomplishing similar comparison by adding 1 to the value specified 
        proximity++;             

        // This defines the list of Job Order information that we'll return to the Lightning Component
        List<Map<String,String>> retVal = new List<Map<String,String>>();

        // Set a local variable that has the geolocation of the Case Record
        Location caseRecordLocation = Location.newInstance(caseRecordLatitude,caseRecordLongitude);

        // Define list to receive the results of the SOQL query
        List<ExpECM__Job_Order__c> jobOrderQueryResult = new List<ExpECM__Job_Order__c>();

        // Run the query
        jobOrderQueryResult = [SELECT Id,
                Name,
                ExpECM__Organization__r.Name,
                Job_Title__c,
                Start_Date_Time__c,
                Special_Requests__c,	
                Special_Requirements__c,
                Duties_Skills__c,
                ExpECM__Number_of_Positions__c,
                ExpECM__Number_of_Assigned_Positions__c,
                BillingStreet__c,
                BillingCity__c,
                BillingState__c,
                BillingPostalCode__c,
                BillingLatitude__c,
                BillingLongitude__c,
                ExpECM__Status__c,
                Supervisor__r.name,
                Supervisor__r.phone,
                Alternate_Supervisor__r.name,
                Alternate_Supervisor__r.phone
        FROM    ExpECM__Job_Order__c
        WHERE   Program__c = :caseRecordProgram
        AND     DISTANCE(ExpECM__Organization__r.BillingAddress, :caseRecordLocation, 'mi') < :proximity 
        ORDER BY DISTANCE(ExpECM__Organization__r.BillingAddress, :caseRecordLocation, 'mi')
        LIMIT   :maxMatchCount];
        
        //         AND     ExpECM__Status__c = 'Open'

        // Spin through each row returned from the SOQL query and peform some additional actions
        for (ExpECM__Job_Order__c currentJobProgramRecord : jobOrderQueryResult) {
            // Each record is going to be converted into a Map structure
            // https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_map.htm#apex_methods_system_map
            // The map will contain name/value pairs of field name/field value.  We're creating a new map so we can add a new calculated field: Distance
            // Each record gets a new Map
            Map<String,String> jobRec = new Map<String, String>{};

            // Get the geolocation of the Job Order Record
            Location jobOrderLocation = Location.newInstance(currentJobProgramRecord.BillingLatitude__c,currentJobProgramRecord.BillingLongitude__c);
            // Calculate the distance in miles between the Case Record andd the Job Order.  This value will eventually be displayed in the 
            // details section of the component.
            Double dist = Location.getDistance(jobOrderLocation, caseRecordLocation, 'mi');
            
            // The distance value has 8 decimal places.  We need to round it down to one decimal place.
            dist = (dist * 10).round();
            dist = dist / 10;

            // Load the map with key/value data
            jobRec.put('Id', currentJobProgramRecord.Id) ; 
            jobRec.put('Name', currentJobProgramRecord.Name) ; 
            jobRec.put('OrganizationName', currentJobProgramRecord.ExpECM__Organization__r.Name) ; 
            jobRec.put('Job_Title__c', currentJobProgramRecord.Job_Title__c) ; 
            jobRec.put('Start_Date_Time__c', currentJobProgramRecord.Start_Date_Time__c.format('EEE, MMM d yyyy')) ; 
            jobRec.put('Special_Requests__c', currentJobProgramRecord.Special_Requests__c) ; 
            jobRec.put('Special_Requirements__c', currentJobProgramRecord.Special_Requirements__c) ; 
            jobRec.put('Duties_Skills__c', currentJobProgramRecord.Duties_Skills__c) ; 
            jobRec.put('ExpECM__Number_of_Positions__c', currentJobProgramRecord.ExpECM__Number_of_Positions__c.format()) ; 
            jobRec.put('ExpECM__Number_of_Assigned_Positions__c', currentJobProgramRecord.ExpECM__Number_of_Assigned_Positions__c.format()) ; 
            jobRec.put('BillingStreet__c', currentJobProgramRecord.BillingStreet__c);
            jobRec.put('BillingCity__c', currentJobProgramRecord.BillingCity__c);
            jobRec.put('BillingState__c', currentJobProgramRecord.BillingState__c);
            jobRec.put('BillingPostalCode__c', currentJobProgramRecord.BillingPostalCode__c);
            jobRec.put('BillingLatitude__c', currentJobProgramRecord.BillingLatitude__c.format()); //format() converts numberic format to string
            jobRec.put('BillingLongitude__c', currentJobProgramRecord.BillingLongitude__c.format());
            jobRec.put('ExpECM__Status__c', currentJobProgramRecord.ExpECM__Status__c);
            jobRec.put('Supervisor_Name', currentJobProgramRecord.Supervisor__r.name);
            jobRec.put('Supervisor_Phone', currentJobProgramRecord.Supervisor__r.phone);
            jobRec.put('Alt_Supervisor_Name', currentJobProgramRecord.Alternate_Supervisor__r.name);
            jobRec.put('Alt_Supervisor_Phone', currentJobProgramRecord.Alternate_Supervisor__r.phone);
            jobRec.put('Distance', dist.format());
            
            // Add the map to the list
            retVal.add(jobRec);

        }
        
        //System.debug('RAW=' + retVal);
        //System.debug('JSON=' + JSON.serialize(retVal));
        
        //Return the list of matching Case Records in JSON format
        return JSON.serialize(retVal);
    }

}
