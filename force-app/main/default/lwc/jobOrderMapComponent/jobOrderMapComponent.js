// Get some key LWC features 
import { LightningElement, api, wire } from 'lwc';
// Allows us to grab the record ID from the currently displayed Job Order record
import { getRecord } from 'lightning/uiRecordApi';
// Allows us to use the Toast pop-up message to display errors
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// This allows us to call the specified Apex method
import getNearbyContacts from '@salesforce/apex/commonMapComponentController.getNearbyContacts';
// Allow us to navigate to other pages
import { NavigationMixin } from 'lightning/navigation';
// Allows us to pre-fill fields when creating a new Job Placment record
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
// Get the ID of the current user
import USER_ID from '@salesforce/user/Id'; 

// These constants are used when pulling information from the current Job Order record
const JOB_ORDER_NAME = 'ExpECM__Job_Order__c.Name';
const JOB_ORDER_PROGRAM = 'ExpECM__Job_Order__c.Program__c';
const JOB_ORDER_STREET = 'ExpECM__Job_Order__c.BillingStreet__c';
const JOB_ORDER_CITY = 'ExpECM__Job_Order__c.BillingCity__c';
const JOB_ORDER_STATE = 'ExpECM__Job_Order__c.BillingState__c';
const JOB_ORDER_POSTAL_CODE = 'ExpECM__Job_Order__c.BillingPostalCode__c';
const JOB_ORDER_LATITUDE = 'ExpECM__Job_Order__c.BillingLatitude__c';
const JOB_ORDER_LONGITUDE = 'ExpECM__Job_Order__c.BillingLongitude__c';
const JOBORDER = 'JobOrder';

// Create an array of the fields we want to retrieve
const JOB_ORDER_FIELDS = [JOB_ORDER_NAME, JOB_ORDER_PROGRAM, JOB_ORDER_STREET, JOB_ORDER_CITY, JOB_ORDER_STATE, JOB_ORDER_POSTAL_CODE, JOB_ORDER_LATITUDE, JOB_ORDER_LONGITUDE,];

export default class JobOrderMapComponent extends NavigationMixin(LightningElement) {
    // These four fields are set by the admin when configuring the Component via the Lightning App Builder
    @api proximity;
    @api listVisibility;
    @api maxMatchCount;
    @api postPlacementFlow; // =  'a5P/o';
    @api standardPlacementCreate;
    @api flowPlacementCreate;

    // Set up local variables
    jobOrderProgram;
    jobOrderName;
    jobOrderStreet;
    jobOrderCity;
    jobOrderState;
    jobOrderPostalCode;
    jobOrderLatitude;
    jobOrderLongitude;

    // UI variables
    mapMarkers = [];
    mapCenter;
    markersTitle;
    selectedMarkerValue;
    listViewSetting;
    isLoading = true;

    caseRecordToDisplay;
    showCaseRecordDetailsPane = false;
    caseRecordDetails = new Map();
    retVal = 'home/home.jsp'; // used to tell the Flow where to return to when finished.  This is a default.

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
            // See what the designtime configuration is for destination of the Flow option for creating the placement
            // and set the return value to the appropriate option.
            if (this.postPlacementFlow == 'Job Placement Tab') {
                this.retVal = 'a5P/o'; // return to the placement tab. See https://help.salesforce.com/articleView?id=000325244 for explanation of object type prefix
            } else {
                this.retVal = this.recordId; // return to the originating record
            }
            return {
                caseRecordId: caseRecord.Id,
                directions: encodeURI(`http://maps.google.com/maps?saddr=${caseRecord.Client_Mailing_Street__c},${caseRecord.Client_Mailing_City__c},${caseRecord.Client_Mailing_State__c},${caseRecord.Client_Mailing_Zip__c}&daddr=${this.jobOrderStreet},${this.jobOrderCity},${this.jobOrderState},${this.jobOrderPostalCode}&dirflg=r`),
                linkToFlow: `/flow/Create_Placement?Job_ID=${caseRecord.Id}&Case_Record_ID=${this.recordId}&retURL=${this.retVal}`,
                title: caseRecord.Name,
                icon: 'standard:user',
                distance: caseRecord.Distance,
                travelToTraining: caseRecord.Travel_to_Training__c,
                status: caseRecord.ExpECM__Status__c,
                educationLevel: caseRecord.Education_Level__c,
                barriersToSuccess: caseRecord.Barriers_to_program_success__c,
                value: caseRecord.Name,
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
            value: JOBORDER,
            icon: 'custom:custom85',
            title: this.jobOrderName,
            location: {
                Street: this.jobOrderStreet,
                City: this.jobOrderCity,
                State: this.jobOrderState,
                PostalCode: this.jobOrderPostalCode,
                Country: this.jobOrderCountry
            }
        });

        // Setting the attribute on the map component to control how the map display is centered
        this.mapCenter = {
            location: {
                Street: this.jobOrderStreet,
                City: this.jobOrderCity,
                State: this.jobOrderState,
                PostalCode: this.jobOrderPostalCode,
            }
        };

        // Set some additional atributes of the map Component
        this.markersTitle = 'Location & Available Case Records';
        this.selectedMarkerValue = this.JOBORDER;
        this.mapMarkers = newMarkers;
        this.listViewSetting = this.listVisibility;
        this.isLoading = false;

        // Load up the array that contains the Case Reord details.  These details will be displayed on the side pane when the 
        // Case Record is selected
        this.index = 0;
        while (this.index < this.mapMarkers.length) {
            this.caseRecordDetails.set(this.mapMarkers[this.index].value, this.mapMarkers[this.index]);
            this.index++;
        }

        console.log('CaseRecordMapComponent.js Completed load DEBUG: ' + this.markersTitle);
    }

    // ************************************************************************
    // Event Method Section
    // ************************************************************************

    // This will fire when a user clicks on a map marker or the list of JobOrders
    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
        console.log('jobOrderMapComponent.js selectedMarkerValue: ' + this.selectedMarkerValue);
        this.caseRecordToDisplay = this.caseRecordDetails.get(this.selectedMarkerValue);
        if (this.selectedMarkerValue == JOBORDER) {
            this.showCaseRecordDetailsPane = false;
        } else {
            this.showCaseRecordDetailsPane = true;
        }

    }

    // Navigation Actions
    // https://developer.salesforce.com/docs/component-library/bundle/lightning-navigation/documentation
    navigateToCaseRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.caseRecordToDisplay.caseRecordId,
                objectApiName: 'ExpECM__Case_Record__c',
                actionName: 'view'
            }
        });
    }


    // This will navigate to the URL corresponding to the Create_Placement flow
    navigateToPlacementFlow() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/flow/Create_Placement?Job_ID=${this.recordId}&Case_Record_ID=${this.caseRecordToDisplay.caseRecordId}&retURL=${this.retVal}`
            }
        });
    }


    // This will execute when the user clicks on the Create Placement button
    createPlacement() {
        const defaultValues = encodeDefaultFieldValues({
            ExpECM__Job_Order__c: this.recordId,
            ExpECM__Case_Record__c: this.caseRecordToDisplay.caseRecordId,
            ExpECM__Placement_Specialist__c: USER_ID,
            ExpECM__Status__c: 'Planned',
            ExpECM__New_Sequence__c: true
            // RecordTypeId is not yet supported, as documented on this page as of July 2020
            // https://developer.salesforce.com/docs/component-library/bundle/lightning-page-reference-utils/documentation
            // RecordTypeId: '0122M000001QRKFQA4'
        });

        // This does the actual navigation
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'ExpECM__Placement__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }

}
