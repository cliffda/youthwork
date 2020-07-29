// Get some key LWC features 
import { LightningElement, api, wire } from 'lwc';
// Allows us to grab the record ID from the currently displayed Job Order record
import { getRecord } from 'lightning/uiRecordApi';
// Allows us to use the Toast pop-up message to display errors
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// This allows us to call the specified Apex method
import getNearbyJobOrders from '@salesforce/apex/commonMapComponentController.getNearbyJobOrders';

// These constants are used when pulling information from the current Case record
const CASE_RECORD_NAME = 'ExpECM__Case_Record__c.Name';
const CASE_RECORD_PROGRAM = 'ExpECM__Case_Record__c.ExpECM__Program__c';
const CASE_RECORD_STREET = 'ExpECM__Case_Record__c.Client_Mailing_Street__c';
const CASE_RECORD_CITY = 'ExpECM__Case_Record__c.Client_Mailing_City__c';
const CASE_RECORD_STATE = 'ExpECM__Case_Record__c.Client_Mailing_State__c';
const CASE_RECORD_POSTAL_CODE = 'ExpECM__Case_Record__c.Client_Mailing_Zip__c';
const CASE_RECORD_LATITUDE = 'ExpECM__Case_Record__c.Client_Mailing_Latitude__c';
const CASE_RECORD_LONGITUDE = 'ExpECM__Case_Record__c.Client_Mailing_Longitude__c';

// Create an array of the fields we want to retrieve
const CASE_RECORD_FIELDS = [CASE_RECORD_NAME,CASE_RECORD_PROGRAM,CASE_RECORD_STREET,CASE_RECORD_CITY,CASE_RECORD_STATE,CASE_RECORD_POSTAL_CODE,CASE_RECORD_LATITUDE,CASE_RECORD_LONGITUDE,];

export default class CaseRecordMapComponent extends LightningElement {
    // These four fields are set by the admin when configuring the Component via the Lightning App Builder
    @api proximity;
    @api listVisibility;
    @api maxMatchCount;
    @api renderFooter;

    // Set up local variables
    caseRecordProgram;
    caseRecordName;
    caseRecordStreet;
    caseRecordCity;
    caseRecordState;
    caseRecordPostalCode;
    jcaseRecordLatitude;
    caseRecordLongitude;

    mapMarkers = [];
    mapCenter;
    markersTitle;
    selectedMarkerValue;
    jobToDisplay;
    listViewSetting;
    showFooter = false;
    isLoading = true;
    jobDetails = new Map();
    index = 0;

    // This uses the built-in ability to capture the record ID from the currently displayed record
    // In this case, it's the ID of the Job Order record.
    @api recordId;

    // Pull in values from the currently displayed record using the recordId we just set
    // The data is pulled without having to make a database call
    @wire(getRecord, { recordId: '$recordId', fields: CASE_RECORD_FIELDS })
    loadRecord({ error, data }) {
        // Error handling
        if (data) {
            this.error = undefined;
            this.caseRecordProgram = data.fields.ExpECM__Program__c.value;
            this.caseRecordName = data.fields.Name.value;
            this.caseRecordStreet = data.fields.Client_Mailing_Street__c.value;
            this.caseRecordCity = data.fields.Client_Mailing_City__c.value;
            this.caseRecordState = data.fields.Client_Mailing_State__c.value;
            this.caseRecordPostalCode = data.fields.Client_Mailing_Zip__c.value;
            this.caseRecordLatitude = data.fields.Client_Mailing_Latitude__c.value;
            this.caseRecordLongitude = data.fields.Client_Mailing_Longitude__c.value;
        } else if (error) {
            this.error = error;
            this.caseRecordName = undefined;
            this.mapMarkers = [];
        }
    }

    // This calls the Apex method JobOrderComponentController.getNearbyContacts, passing in parameters
    @wire(getNearbyJobOrders, {
        proximity: '$proximity',
        caseRecordProgram: '$caseRecordProgram',
        caseRecordLatitude: '$caseRecordLatitude',
        caseRecordLongitude: '$caseRecordLongitude',
        maxMatchCount: '$maxMatchCount'
    })
    // This method is called when the above @wire function completes
    // The Apex method above returns the results of a SOQL survey.
    // This method will parse the results and call a method to create a 
    // set of map markers that will be passed to the actual map component
    wiredJobOrdersJSON({ error, data }) {
        if (data) {
            this.createMapMarkers(JSON.parse(data));
        } else if (error) {
            this.isLoading = false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading Job Orders Near Case Record',
                    message: error.message,
                    variant: 'error'
                })
            );
        }
    }

    // This is the method that will construct the map/array (https://www.w3schools.com/jsref/jsref_map.asp) that contains
    // the map point attributes
    // Documentation for building the Google Maps URL to show directions can be found here https://www.erichstauffer.com/technology/google-maps-query-string-parameters
    createMapMarkers(jobOrderData) {
        const newMarkers = jobOrderData.map(jobOrder => {
            return {
                directions: encodeURI(`http://maps.google.com/maps?saddr=${jobOrder.BillingStreet__c},${jobOrder.BillingCity__c},${jobOrder.BillingState__c},${jobOrder.BillingPostalCode__c}&daddr=${this.caseRecordStreet},${this.caseRecordCity},${this.caseRecordState},${this.caseRecordPostalCode}&dirflg=r`), 
                title: jobOrder.Name,
                icon: 'standard:user',
                description: `Organization: ${jobOrder.OrganizationName}`, 
                organization: jobOrder.OrganizationName,
                distance: jobOrder.Distance,
                jobTitle: jobOrder.Job_Title__c,
                startDate: jobOrder.Start_Date_Time__c,
                specialRequests: jobOrder.Special_Requests__c,
                specialRequirements: jobOrder.Special_Requirements__c,
                dutiesSkills: jobOrder.Duties_Skills__c,
                numOfPositions: jobOrder.ExpECM__Number_of_Positions__c,
                numOfAssigned: jobOrder.ExpECM__Number_of_Assigned_Positions__c,     
                value: jobOrder.Name,
                Client: jobOrder.Id,
                location: {
                    Street: jobOrder.BillingStreet__c,
                    City: jobOrder.BillingCity__c,
                    State: jobOrder.BillingState__c,
                    PostalCode: jobOrder.BillingPostalCode__c,
                    Latitude: jobOrder.BillingLatitude__c,
                    Longitude: jobOrder.BillingLongitude__c
                }
            };
        });
        // Insert a new entry at the beginning of the map/array that contains the Job Order.
        // This ensures that the Job Order is the first entry in the list that displays next to the actual map
        newMarkers.unshift({
            value: 'CaseRecord',
            title: this.caseRecordName,
            location: {
                Street: this.caseRecordStreet,
                City: this.caseRecordCity,
                State: this.caseRecordState,
                PostalCode: this.caseRecordPostalCode
            }
        });

        // Setting the attribute on the map component to control how the map display is centered
        this.mapCenter = {
            location: { 
                Street: this.caseRecordStreet,
                City: this.caseRecordCity,
                State: this.caseRecordState,
                PostalCode: this.caseRecordPostalCode
            }
        };

        // Set some additional atributes of the map Component
        this.markersTitle = 'Location & Available Job Orders';
        this.selectedMarkerValue = 'CaseRecord';
        this.mapMarkers = newMarkers;
        this.listViewSetting = this.listVisibility;
        this.isLoading = false;

        this.index = 0;
        while (this.index < this.mapMarkers.length) { 
            this.jobDetails.set(this.mapMarkers[this.index].value, this.mapMarkers[this.index]);
            this.index++; 
        }
        
        console.log('CaseRecordMapComponent.js Completed load DEBUG: ' + this.markersTitle);
    }

    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
        console.log('CaseRecordMapComponent.js selectedMarkerValue: ' + this.selectedMarkerValue);
        this.jobToDisplay = this.jobDetails.get(this.selectedMarkerValue);
        this.showFooter = true;
    }

    badgeSelected(event) {
        console.log('CaseRecordMapComponent.js badgeSelected' + event);
        const recId = event.detail.recId;
        const action = event.detail.action;

        switch(action) {
            case 'nba':
                {
                    console.log('isvConsoleMap.js message' + message);
                    break;
                }
            case 'NavToRecord':
                //
              break;
            case 'ConvertLead':
                //
            break;
            case 'NotifySales':
                //
            break;
            default:
              // code block
          }

    }

}
