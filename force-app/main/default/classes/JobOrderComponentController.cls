public with sharing class JobOrderComponentController {
    public JobOrderComponentController() {

    }

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
        List<ExpECM__Case_Record__c> caseRecordList = new List<ExpECM__Case_Record__c>();

        // Run the query
        caseRecordList = [SELECT Id, Name,
                Client_Mailing_Street__c,
                Client_Mailing_City__c,
                Client_Mailing_State__c,
                Client_Mailing_Zip__c,
                Client_Mailing_Latitude__c,
                Client_Mailing_Longitude__c,
                ExpECM__Status__c,
                Travel_to_Training__c,
                Barriers_to_program_success__c,
                Education_Level__c 
        FROM    ExpECM__Case_Record__c
        WHERE   ExpECM__Program__c = :jobOrderProgram
        AND     DISTANCE(ExpECM__Main_Client__r.MailingAddress, :jobOrderLocation, 'mi') < :proximity 
        ORDER BY DISTANCE(ExpECM__Main_Client__r.MailingAddress, :jobOrderLocation, 'mi')
        LIMIT   :maxMatchCount];

        // Spin through each row returned from the SOQL query and peform some additional actions
        for (ExpECM__Case_Record__c currentCaseRecord : caseRecordList) {
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
            caseRec.put('Distance', dist.format());
            
            // Add the map to the list
            retVal.add(caseRec);

        }
        
        //System.debug('RAW=' + retVal);
        //System.debug('JSON=' + JSON.serialize(retVal));
        
        //Return the list of matching Case Records in JSON format
        return JSON.serialize(retVal);
    }
}