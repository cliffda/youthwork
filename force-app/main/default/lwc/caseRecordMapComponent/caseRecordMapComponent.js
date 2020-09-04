// Get some key LWC features 
import { LightningElement, api, wire } from 'lwc';
// Allows us to grab the record ID from the currently displayed Job Order record
import { getRecord } from 'lightning/uiRecordApi';
// Allows us to use the Toast pop-up message to display errors
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// This allows us to call the specified Apex method
import getNearbyJobOrders from '@salesforce/apex/commonMapComponentController.getNearbyJobOrders';
// Allow us to navigate to other pages
import { NavigationMixin } from 'lightning/navigation';
// Allows us to pre-fill fields when creating a new Job Placment record
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
// Allows us to refresh the Job query
import { refreshApex } from '@salesforce/apex';

// These constants are used when pulling information from the current Case record
const CASE_RECORD_NAME = 'ExpECM__Case_Record__c.Name';
const CASE_RECORD_PROGRAM = 'ExpECM__Case_Record__c.ExpECM__Program__c';
const CASE_RECORD_STREET = 'ExpECM__Case_Record__c.Client_Mailing_Street__c';
const CASE_RECORD_CITY = 'ExpECM__Case_Record__c.Client_Mailing_City__c';
const CASE_RECORD_STATE = 'ExpECM__Case_Record__c.Client_Mailing_State__c';
const CASE_RECORD_POSTAL_CODE = 'ExpECM__Case_Record__c.Client_Mailing_Zip__c';
const CASE_RECORD_LATITUDE = 'ExpECM__Case_Record__c.Client_Mailing_Latitude__c';
const CASE_RECORD_LONGITUDE = 'ExpECM__Case_Record__c.Client_Mailing_Longitude__c';
const CASERECORD = 'CaseRecord';

// Create an array of the fields we want to retrieve
const CASE_RECORD_FIELDS = [CASE_RECORD_NAME, CASE_RECORD_PROGRAM, CASE_RECORD_STREET, CASE_RECORD_CITY, CASE_RECORD_STATE, CASE_RECORD_POSTAL_CODE, CASE_RECORD_LATITUDE, CASE_RECORD_LONGITUDE,];

export default class CaseRecordMapComponent extends NavigationMixin(LightningElement) {
    // These four fields are set by the admin when configuring the Component via the Lightning App Builder
    @api proximity;
    @api listVisibility;
    @api maxMatchCount;
    @api postPlacementFlow; // =  'a5P/o';
    @api standardPlacementCreate;
    @api flowPlacementCreate;


    // Set up local variables
    caseRecordProgram;
    caseRecordName;
    caseRecordStreet;
    caseRecordCity;
    caseRecordState;
    caseRecordPostalCode;
    caseRecordLatitude;
    caseRecordLongitude;

    allMarkers = [];
    openMarkersOnly = [];
    mapMarkers = [];
    mapCenter;
    markersTitle;
    selectedMarkerValue;
    selectedJobId;
    jobToDisplay;
    listViewSetting;
    showJobDetailsPane = false;
    isLoading = true;
    jobDetails = new Map();
    index = 0;
    retVal = 'home/home.jsp'; // used to tell the Flow where to return to when finished.  This is a default.
    includeAllJobs = false; 

    // This uses the built-in ability to capture the record ID from the currently displayed record
    // In this case, it's the ID of the Case Record.
    @api recordId;
    wiredJobOrders;

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
    // set of map markers that will be passed to the UI map component
    wiredJobOrdersJSON(value) {
        //this.wiredJobOrders = value; // track the provisioned value
        const { data, error } = value; // destructure the provisioned value
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
    // We're also loading lots of other fields that will be used elsewhere, such as the Job Order detail pane.
    createMapMarkers(jobOrderData) {
        if (this.postPlacementFlow == 'Job Placement Tab') {
            this.retVal = 'a5P/o'; // see https://help.salesforce.com/articleView?id=000325244 for explanation of object type prefix
        } else {
            this.retVal = this.recordId;
        }
        let myArray = [];
        for (const element of jobOrderData) {
            const entry = {
                jobId: element.Id,
                jobStatus: element.ExpECM__Status__c,
                directions: encodeURI(`http://maps.google.com/maps?saddr=${element.BillingStreet__c},${element.BillingCity__c},${element.BillingState__c},${element.BillingPostalCode__c}&daddr=${this.caseRecordStreet},${this.caseRecordCity},${this.caseRecordState},${this.caseRecordPostalCode}&dirflg=r`),
                linkToFlow: `/flow/Create_Placement?Job_ID=${element.Id}&Case_Record_ID=${this.recordId}&retURL=${this.retVal}`,
                title:  `${element.Name} (${element.ExpECM__Status__c})`,
                icon: 'custom:custom85',
                description: element.OrganizationName,
                distance: element.Distance,
                jobTitle: element.Job_Title__c,
                startDate: element.Start_Date_Time__c,
                specialRequests: element.Special_Requests__c,
                specialRequirements: element.Special_Requirements__c,
                dutiesSkills: element.Duties_Skills__c,
                numOfPositions: element.ExpECM__Number_of_Positions__c,
                numOfAssigned: element.ExpECM__Number_of_Assigned_Positions__c,
                value: `${element.Name} (${element.ExpECM__Status__c})`,
                location: {
                    Street: element.BillingStreet__c,
                    City: element.BillingCity__c,
                    State: element.BillingState__c,
                    PostalCode: element.BillingPostalCode__c,
                    Latitude: element.BillingLatitude__c,
                    Longitude: element.BillingLongitude__c
                }
            };

            // Add it to the All Markers array
            this.allMarkers.push(entry);

            // Only add Open jobs to the Open Markers array
            if (entry.jobStatus == 'Open') {
                this.openMarkersOnly.push(entry);
            }
        }
        
        // Insert a new entry at the beginning of the map/array that contains the Case Record.
        // This ensures that the Case Record is the first entry in the list that displays next to the actual map
        const CaseRecordEntry = {
            value: CASERECORD,
            title: this.caseRecordName,
            icon: 'standard:user',
            location: {
                Street: this.caseRecordStreet,
                City: this.caseRecordCity,
                State: this.caseRecordState,
                PostalCode: this.caseRecordPostalCode,
                Latitude: this.caseRecordLatitude,
                Longitude: this.caseRecordLongitude
            }
        };
        this.openMarkersOnly.unshift(CaseRecordEntry);        
        this.allMarkers.unshift(CaseRecordEntry);

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
        this.selectedMarkerValue = this.CASERECORD;
        this.mapMarkers = this.openMarkersOnly;
        this.listViewSetting = this.listVisibility;
        this.isLoading = false;
    }

    // This will fire when a user clicks on a map marker or the list of JobOrders
    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;

        for (const row of this.mapMarkers) {
            if (row.value == this.selectedMarkerValue) {
                this.jobToDisplay = row;
                break;
            }
        }

        if (this.selectedMarkerValue == CASERECORD) {
            this.showJobDetailsPane = false; // Hide the details pane if the user selected the Case Record
        } else {
            this.showJobDetailsPane = true; // Show the details pane if the user selected a Job Order
        }

    }

    // Navigation Actions
    // https://developer.salesforce.com/docs/component-library/bundle/lightning-navigation/documentation
    navigateToJobOrder() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.jobToDisplay.jobId,
                objectApiName: 'ExpECM__Job_Order__c',
                actionName: 'view'
            }
        });
    }

    refreshData() {
        const checked = Array.from(
            this.template.querySelectorAll('lightning-input')
        )
            // Filter down to checked items
            .filter(element => element.checked)
            // Map checked items to their labels
            .map(element => element.label);

        if (checked.includes('Include Closed and Prospective Job Orders')) {
            this.mapMarkers = this.allMarkers;
        } else {
            this.mapMarkers = this.openMarkersOnly;
        }

        this.showJobDetailsPane = false;
        
        return;
    }


    navigateToPlacementFlow() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/flow/Create_Placement?Job_ID=${this.jobToDisplay.jobId}&Case_Record_ID=${this.recordId}&retURL=${this.retVal}`
            }
        });
    }


    // This will execute when the user clicks on the Create Placement button
    createPlacement() {
        const defaultValues = encodeDefaultFieldValues({
            ExpECM__Job_Order__c: this.jobToDisplay.jobId,
            ExpECM__Case_Record__c: this.recordId,
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