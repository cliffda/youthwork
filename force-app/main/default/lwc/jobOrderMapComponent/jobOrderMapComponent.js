// Get some key LWC features 
import { LightningElement, api, wire } from 'lwc';
// Allows us to grab the record ID from the currently displayed Job Order record
import { getRecord } from 'lightning/uiRecordApi';
// Allows us to use the Toast pop-up message to display errors
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// This allows us to call the specified Apex method
import getNearbyContacts from '@salesforce/apex/JobOrderComponentController.getNearbyContacts';

// These constants are used when pulling information from the current Job Order record
const JOB_ORDER_NAME = 'ExpECM__Job_Order__c.Name';
const JOB_ORDER_PROGRAM = 'ExpECM__Job_Order__c.Program__c';
const JOB_ORDER_STREET = 'ExpECM__Job_Order__c.BillingStreet__c';
const JOB_ORDER_CITY = 'ExpECM__Job_Order__c.BillingCity__c';
const JOB_ORDER_STATE = 'ExpECM__Job_Order__c.BillingState__c';
const JOB_ORDER_POSTAL_CODE = 'ExpECM__Job_Order__c.BillingPostalCode__c';
const JOB_ORDER_LATITUDE = 'ExpECM__Job_Order__c.BillingLatitude__c';
const JOB_ORDER_LONGITUDE = 'ExpECM__Job_Order__c.BillingLongitude__c';

// Create an array of the fields we want to retrieve
const JOB_ORDER_FIELDS = [JOB_ORDER_NAME,JOB_ORDER_PROGRAM,JOB_ORDER_STREET,JOB_ORDER_CITY,JOB_ORDER_STATE,JOB_ORDER_POSTAL_CODE,JOB_ORDER_LATITUDE,JOB_ORDER_LONGITUDE,];

export default class JobOrderMapComponent extends LightningElement {
    // These four fields are set by the admin when configuring the Component via the Lightning App Builder
    @api proximity;
    @api listVisibility;
    @api maxMatchCount;
    @api renderFooter;

    // Set up local variables
    jobOrderProgram;
    jobOrderName;
    jobOrderStreet;
    jobOrderCity;
    jobOrderState;
    jobOrderPostalCode;
    jobOrderLatitude;
    jobOrderLongitude;

    mapMarkers = [];
    mapCenter;
    markersTitle;
    selectedMarkerValue;
    listViewSetting;
    showFooter;
    isLoading = true;

    // This uses the built-in ability to capture the record ID from the currently displayed record
    // In this case, it's the ID of the Job Order record.
    @api recordId;

    // Pull in values from the currently displayed record using the recordId we just set
    // The data is pulled without having to make a database call
    @wire(getRecord, { recordId: '$recordId', fields: JOB_ORDER_FIELDS })
    loadRecord({ error, data }) {
        // Error handling
        if (data) {
            this.error = undefined;
            this.jobOrderProgram = data.fields.Program__c.value;
            this.jobOrderName = data.fields.Name.value;
            this.jobOrderStreet = data.fields.BillingStreet__c.value;
            this.jobOrderCity = data.fields.BillingCity__c.value;
            this.jobOrderState = data.fields.BillingState__c.value;
            this.jobOrderPostalCode = data.fields.BillingPostalCode__c.value;
            this.jobOrderLatitude = data.fields.BillingLatitude__c.value;
            this.jobOrderLongitude = data.fields.BillingLongitude__c.value;
        } else if (error) {
            this.error = error;
            this.jobOrderName = undefined;
            this.mapMarkers = [];
        }
    }

    // This calls the Apex method JobOrderComponentController.getNearbyContacts, passing in parameters
    @wire(getNearbyContacts, {
        proximity: '$proximity',
        jobOrderProgram: '$jobOrderProgram',
        jobOrderLatitude: '$jobOrderLatitude',
        jobOrderLongitude: '$jobOrderLongitude',
        maxMatchCount: '$maxMatchCount'
    })
    // This method is called when the above @wire function completes
    // The Apex method above returns the results of a SOQL survey.
    // This method will parse the results and call a method to create a 
    // set of map markers that will be passed to the actual map component
    wiredCaseRecordsJSON({ error, data }) {
        if (data) {
            this.createMapMarkers(JSON.parse(data));
        } else if (error) {
            this.isLoading = false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading Case Records Near Job',
                    message: error.message,
                    variant: 'error'
                })
            );
        }
    }

    // This is the method that will construct the map/array (https://www.w3schools.com/jsref/jsref_map.asp) that contains
    // the map point attributes
    createMapMarkers(caseRecordData) {
        const newMarkers = caseRecordData.map(caseRecord => {
            return {
                title: caseRecord.Name,
                icon: 'standard:user',
                description: `Distance: [${caseRecord.Distance} Miles], Travel to Training: [${caseRecord.Travel_to_Training__c}], Status: [${caseRecord.ExpECM__Status__c}],  Education Level: [${caseRecord.Education_Level__c}], Barriers to Success: [${caseRecord.Barriers_to_program_success__c}]`, 
                location: {
                    Street: caseRecord.Client_Mailing_Street__c,
                    City: caseRecord.Client_Mailing_City__c,
                    State: caseRecord.Client_Mailing_State__c,
                    PostalCode: caseRecord.Client_Mailing_Zip__c,
                    Latitude: caseRecord.Client_Mailing_Latitude__c,
                    Longitude: caseRecord.Client_Mailing_Longitude__c
                }
            };
        });
        // Insert a new entry at the beginning of the map/array that contains the Job Order.
        // This ensures that the Job Order is the first entry in the list that displays next to the actual map
        newMarkers.unshift({
            value: 'JobOrder',
            title: this.jobOrderName,
            location: {
                City: this.jobOrderCity,
                Country: this.jobOrderCountry,
                PostalCode: this.jobOrderPostalCode,
                State: this.jobOrderState,
                Street: this.jobOrderStreet
            }
        });

        // Setting the attribute on the map component to control how the map display is centered
        this.mapCenter = {
            location: { 
                City: this.jobOrderCity,
                Country: this.jobOrderCountry,
                PostalCode: this.jobOrderPostalCode,
                State: this.jobOrderState,
                Street: this.jobOrderStreet
            }
        };

        // Set some additional atributes of the map Component
        this.markersTitle = 'Location & Available Contacts';
        this.selectedMarkerValue = 'JobOrder';
        this.mapMarkers = newMarkers;
        this.listViewSetting = this.listVisibility;
        this.isLoading = false;
        this.showFooter = this.renderFooter;
    }
}
