public with sharing class ContactMapController {
    public ContactMapController() {
    }

    @AuraEnabled(cacheable=true)
    public static String getNearbyJobOrders(
        Decimal latitude,
        Decimal longitude,
        Integer proximity
        ) {

        proximity++;

        String query =  'SELECT Name, Job_Title__c, ExpECM__Organization__r.name, GeoLoc__latitude__s, GeoLoc__longitude__s ' +
                        'FROM ExpECM__Job_Order__C ' +
                        'WHERE DISTANCE(MailingAddress, GEOLOCATION(' + latitude + ',' + longitude + '), \'mi\') < ' + proximity + ' ' +
                        'ORDER BY DISTANCE(MailingAddress, GEOLOCATION(' + latitude + ',' + longitude + '), \'mi\')' +
                        'LIMIT 10';
            System.debug(query);
            System.debug(JSON.serialize(Database.query(query)));
            return JSON.serialize(Database.query(query));
    }
}
