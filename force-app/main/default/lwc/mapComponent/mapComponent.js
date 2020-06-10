import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getNearbyJobOrders from '@salesforce/apex/ContactMapController.getNearbyJobOrders';

const LONGITUDE_FIELD = 'Contact.MailingLatitude';
const LATITUDE_FIELD = 'Contact.MailingLongitude';
const CONTACT_NAME = 'Contact.Name';
const CONTACT_FIELDS =[CONTACT_NAME, LONGITUDE_FIELD, LATITUDE_FIELD];


export default class mapComponent extends LightningElement {
    @api proximity;
    @api listVisibility;
    isRendered;

    contactId;
    contactName;
    contactLongitude;
    contactLatitude;

    mapMarkers = [];
    mapCenter;
    markersTitle;
    selectedMarkerValue;
    listViewSetting;
    isLoading = true;

    @api
    get recordId() {
        return contactId;
    }
    set recordId(value) {
        this.setAttribute('contactId', value);
        this.contactId = value;
    }

    @wire(getRecord, { recordId: '$contactId', fields: CONTACT_FIELDS })
    wiredRecord({ error, data }) {
        // Error handling
        if (data) {
            this.error = undefined;
            this.contactName = data.fields.Name.value;
            this.contactLatitude = data.fields.MailingLatitude.value;
            this.contactLongitude = data.fields.MailingLongitude.value;
        } else if (error) {
            this.error = error;
            //this.contactId = undefined;
            this.mapMarkers = [];
        }
    }


    @wire(getNearbyJobOrders, {
        latitude: '$contactLatitude',
        longitude: '$contactLongitude',
        proximity: '$proximity'
    })

    wiredJobsJSON({ error, data }) {
        if (data) {
            this.createMapMarkers(JSON.parse(data));
        } else if (error) {
            this.isLoading = false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading Jobs Near Contact',
                    message: error.message,
                    variant: 'error'
                })

            );
        }
    }

    createMapMarkers(jobData) {
        const newMarkers = jobData.map(job => {
            return {
                title: job.Job_Title__c,
                description: job.Name + '</br>' + job.ExpECM__Organization__r.Name,
                location: {
                    Latitude: job.geoloc__Latitude__s,
                    Longitude: job.geoloc__Longitude__s
                }
            };
        });

        newMarkers.unshift({
            value: 'contact',
            icon: 'standard:user',
            title: this.contactName, // Name of person
            location: {
                Latitude: this.contactLatitude,
                Longitude: this.contactLongitude
            }
        });

        this.mapCenter = {
            location: { 
                Latitude: this.contactLatitude,
                Longitude: this.contactLongitude 
            }
        };
        this.markersTitle = 'Nearby Jobs';
        this.selectedMarkerValue = 'contact';
        this.mapMarkers = newMarkers;
        this.listViewSetting = this.listVisibility;
        this.isLoading = false;
    }
}
