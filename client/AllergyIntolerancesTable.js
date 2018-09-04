// =======================================================================
// Using DSTU2  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// https://www.hl7.org/fhir/DSTU2/allergyintolerance.html
//
//
// =======================================================================


import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';
import { get } from 'lodash';

export class AllergyIntolerancesTable extends React.Component {

  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      allergyIntolerances: [],
      displayToggle: false,
      displayIdentifier: false,
      displayDates: false,
      displayStatus: false,
      displayVerification: false,
      displayType: false,
      displayCategory: false,
      fhirVersion: 'v1.0.2'
    }

    // STU3 v3.0.1
    if(this.props.displayStatus){
      data.displayStatus = this.props.displayStatus;
    }
    if(this.props.displayVerification){
      data.displayVerification = this.props.displayVerification;
    }


    // DSTU2 v1.0.2
    if(this.props.displayIdentifier){
      data.displayIdentifier = this.props.displayIdentifier;
    }
    if(this.props.displayType){
      data.displayType = this.props.displayType;
    }
    if(this.props.displayCategory){
      data.displayCategory = this.props.displayCategory;
    }
    if(this.props.fhirVersion){
      data.fhirVersion = this.props.fhirVersion;
      switch (this.props.fhirVersion) {
        case 'v1.0.2':
            data.displayToggle = false;
            data.displayDates = true;
            data.displayIdentifier = true;
            data.displayStatus = false;
            data.displayVerification = false;
            data.displayType = true;
            data.displayCategory = true;
          break;      
        case 'v3.0.1':
          data.displayToggle = false;
          data.displayDates = true;
          data.displayIdentifier = true;
          data.displayStatus = true;
          data.displayVerification = true;
          data.displayType = true;
          data.displayCategory = true;
        break;      
      default:
          break;
      }
    }

    // Workflow Items
    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }

    // Data
    if(this.props.data){
      data.allergyIntolerances = this.props.data;
    } else {
      if(AllergyIntolerances.find().count() > 0){
        data.allergyIntolerances = AllergyIntolerances.find().fetch();
      }  
    }

    if(process.env.NODE_ENV === "test") console.log("AllergyIntolerancesTable[data]", data);
    return data;
  };

  renderTogglesHeader(displayToggle){
    if (displayToggle) {
      return (
        <th className="toggle">toggle</th>
      );
    }
  }
  renderToggles(displayToggle, patientId ){
    if (displayToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
            />
          </td>
      );
    }
  }

  renderIdentifierHeader(displayIdentifier){
    if (displayIdentifier) {
      return (
        <th className="identifier">identifier</th>
      );
    }
  }
  renderIdentifier(displayIdentifier, allergyIntolerances ){
    if (displayIdentifier) {
      
      return (
        <td className='identifier'>{ get(allergyIntolerances, 'identifier[0].value') }</td>       );
    }
  }

  renderDateHeader(displayDates){
    if (displayDates) {
      return (
        <th className='date'>date</th>
      );
    }
  }
  renderDate(displayDates, newDate ){
    if (displayDates) {
      return (
        <td className='date'>{ moment(newDate).format('YYYY-MM-DD') }</td>
      );
    }
  }



  renderClinicalStatusHeader(displayStatus){
    if (displayStatus) {
      return (
        <th className="clinicalStatus">status</th>
      );
    }
  }
  renderClinicalStatus(displayStatus, allergyIntolerances ){
    if (displayStatus) {
      return (
        <td className='clinicalStatus'>{ get(allergyIntolerances, 'clinicalStatus') }</td>       );
    }
  }

  renderVerificationStatusHeader(displayVerification){
    if (displayVerification) {
      return (
        <th className="verificationStatus">verification</th>
      );
    }
  }
  renderVerificationStatus(displayVerification, allergyIntolerances ){
    if (displayVerification) {
      return (
        <td className='verificationStatus'>{ get(allergyIntolerances, 'verificationStatus') }</td>       );
    }
  }


  renderTypeHeader(displayType){
    if (displayType) {
      return (
        <th className="type">type</th>
      );
    }
  }
  renderType(displayType, allergyIntolerances ){
    if (displayType) {
      return (
        <td className='type'>{ get(allergyIntolerances, 'type') }</td>       );
    }
  }
  renderCategoryHeader(displayCategory){
    if (displayCategory) {
      return (
        <th className="category">category</th>
      );
    }
  }
  renderCategory(displayCategory, allergyIntolerances ){
    if (displayCategory) {
      return (
        <td className='category'>{ get(allergyIntolerances, 'category[0]') }</td>       );
    }
  }

  rowClick(id){
    Session.set('allergyIntolerancesUpsert', false);
    Session.set('selectedAllergyIntolerance', id);
    Session.set('allergyIntolerancePageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.allergyIntolerances.length; i++) {
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        identifier: '',
        type: '',
        category: '',
        clinicalStatus: '',
        verificationStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: '',
        criticality: '',
        patient: '',
        recorder: '', 
        reaction: '',
        onset: ''
      };

      newRow.identifier = get(this.data.allergyIntolerances[i], 'identifier[0].value');
      newRow.clinicalStatus = get(this.data.allergyIntolerances[i], 'clinicalStatus');
      newRow.verificationStatus = get(this.data.allergyIntolerances[i], 'verificationStatus');
      newRow.type = get(this.data.allergyIntolerances[i], 'type');
      newRow.category = get(this.data.allergyIntolerances[i], 'category[0]');

      if(get(this.data.allergyIntolerances[i], 'code.coding[0]')){            
        newRow.snomedCode = get(this.data.allergyIntolerances[i], 'code.coding[0].code');
        newRow.snomedDisplay = get(this.data.allergyIntolerances[i], 'code.coding[0].display');
      }

      // DSTU2 v1.0.2
      newRow.patient = get(this.data.allergyIntolerances[i], 'patient.display');
      newRow.recorder = get(this.data.allergyIntolerances[i], 'recorder.display');
      newRow.reaction = get(this.data.allergyIntolerances[i], 'reaction[0].description');
      newRow.onset = moment(get(this.data.allergyIntolerances[i], 'reaction[0].onset')).format("YYYY-MM-DD");

      if(get(this.data.allergyIntolerances[i], 'criticality')){
        switch (get(this.data.allergyIntolerances[i], 'criticality')) {
          case "CRITL":
            newRow.criticality = 'Low Risk';         
            break;
          case "CRITH":
            newRow.criticality = 'High Risk';         
            break;
          case "CRITU":
            newRow.criticality = 'Unable to determine';         
            break;        
          default:
            newRow.criticality = get(this.data.allergyIntolerances[i], 'criticality');    
          break;
        }
      };

      tableRows.push(
        <tr key={i} className="allergyIntoleranceRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.allergyIntolerances[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.allergyIntolerances[i]) }
          { this.renderIdentifier(this.data.displayIdentifier, this.data.allergyIntolerances[i]) }
          <td className='reaction'>{ newRow.reaction }</td>
          <td className='criticality'>{ newRow.criticality }</td>
          { this.renderType(this.data.displayType, this.data.allergyIntolerances[i]) }
          { this.renderCategory(this.data.displayCategory, this.data.allergyIntolerances[i]) }
          <td className='patient'>{ newRow.patient }</td>
          <td className='recorder'>{ newRow.recorder }</td>
          <td className='onset'>{ newRow.onset }</td>
          { this.renderClinicalStatus(this.data.displayStatus, this.data.allergyIntolerances[i]) }
          { this.renderVerificationStatus(this.data.displayVerification, this.data.allergyIntolerances[i]) }
          { this.renderVerificationStatus(this.data.displayVerification, this.data.allergyIntolerances[i]) }
          { this.renderDate(this.data.displayDates, this.data.allergyIntolerances[i].assertedDate) }
        </tr>
      )
    }

    return(
      <Table id='allergyIntolerancesTable' hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            { this.renderIdentifierHeader(this.data.displayIdentifier) }
            <th className='reaction'>Reaction</th>
            <th className='criticality'>Criticality</th>
            { this.renderTypeHeader(this.data.displayType) }
            { this.renderCategoryHeader(this.data.displayCategory) }
            <th className='patient'>Patient</th>
            <th className='recorder'>Recorder</th>
            <th className='onsert'>Onset</th>
            { this.renderClinicalStatusHeader(this.data.displayStatus) }
            { this.renderVerificationStatusHeader(this.data.displayVerification) }
            { this.renderDateHeader(this.data.displayDates) }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

ReactMixin(AllergyIntolerancesTable.prototype, ReactMeteorData);
export default AllergyIntolerancesTable;