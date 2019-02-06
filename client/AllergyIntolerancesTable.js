// =======================================================================
// Using DSTU2  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// https://www.hl7.org/fhir/DSTU2/allergyintolerance.html
//
//
// =======================================================================


import { Card, CardActions, CardMedia, CardText, CardTitle, Toggle } from 'material-ui';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';
import { get } from 'lodash';
import PropTypes from 'prop-types';


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
      data.hideStatus = this.props.displayStatus;
    }
    if(this.props.displayVerification){
      data.hideVerification = this.props.displayVerification;
    }


    // DSTU2 v1.0.2
    if(this.props.displayIdentifier){
      data.hideIdentifier = this.props.displayIdentifier;
    }
    if(this.props.displayType){
      data.hideType = this.props.displayType;
    }
    if(this.props.displayCategory){
      data.hideCategory = this.props.displayCategory;
    }
    if(this.props.fhirVersion){
      data.fhirVersion = this.props.fhirVersion;
      switch (this.props.fhirVersion) {
        case 'v1.0.2':
            data.hideToggle = false;
            data.hideDates = true;
            data.hideIdentifier = true;
            data.hideStatus = false;
            data.hideVerification = false;
            data.hideType = true;
            data.hideCategory = true;
          break;      
        case 'v3.0.1':
          data.hideToggle = false;
          data.hideDates = true;
          data.hideIdentifier = true;
          data.hideStatus = true;
          data.hideVerification = true;
          data.hideType = true;
          data.hideCategory = true;
        break;      
      default:
          break;
      }
    }

    // Workflow Items
    if(this.props.hideToggle){
      data.hideToggle = this.props.hideToggle;
    }
    if(this.props.displayDates){
      data.hideDates = this.props.displayDates;
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

  renderTogglesHeader(){
    if (!this.props.hideToggle) {
      return (
        <th className="toggle">Toggle</th>
      );
    }
  }
  renderToggles(patientId ){
    if (!this.props.hideToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
            />
          </td>
      );
    }
  }

  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className="identifier">Identifier</th>
      );
    }
  }
  renderIdentifier(allergyIntolerance){
    if (!this.props.hideIdentifier) {
      
      return (
        <td className='identifier'>{ get(allergyIntolerance, 'identifier[0].value') }</td>       );
    }
  }

  renderDateHeader(){
    if (!this.props.hideDate) {
      return (
        <th className='date'>Date</th>
      );
    }
  }
  renderDate(newDate){
    if (!this.props.hideDate) {
      return (
        <td className='date'>{ moment(newDate).format('YYYY-MM-DD') }</td>
      );
    }
  }



  renderClinicalStatusHeader(){
    if (!this.props.hideStatus) {
      return (
        <th className="clinicalStatus">Status</th>
      );
    }
  }
  renderClinicalStatus(allergyIntolerances ){
    if (!this.props.hideStatus) {
      return (
        <td className='clinicalStatus'>{ get(allergyIntolerances, 'clinicalStatus') }</td>       );
    }
  }

  renderVerificationStatusHeader(){
    if (!this.props.hideVerification) {
      return (
        <th className="verificationStatus">Verification</th>
      );
    }
  }
  renderVerificationStatus(allergyIntolerances ){
    if (!this.props.hideVerification) {
      return (
        <td className='verificationStatus'>{ get(allergyIntolerances, 'verificationStatus') }</td>       );
    }
  }


  renderTypeHeader(){
    if (!this.props.hideType) {
      return (
        <th className="type">Type</th>
      );
    }
  }
  renderType(allergyIntolerances ){
    if (!this.props.hideType) {
      return (
        <td className='type'>{ get(allergyIntolerances, 'type') }</td>       );
    }
  }
  renderCategoryHeader(){
    if (!this.props.hideCategory) {
      return (
        <th className="category">Category</th>
      );
    }
  }
  renderCategory(allergyIntolerances ){
    if (!this.props.hideCategory) {
      return (
        <td className='category'>{ get(allergyIntolerances, 'category[0]') }</td>       );
    }
  }
  renderPatientHeader(){
    if (!this.props.hidePatient) {
      return (
        <th className="patient">Patient</th>
      );
    }
  }
  renderPatient(allergyIntolerances ){
    if (!this.props.hidePatient) {
      return (
        <td className='patient'>{ get(allergyIntolerances, 'patient.display') }</td>       );
    }
  }
  renderRecorderHeader(){
    if (!this.props.hideRecorder) {
      return (
        <th className="recorder">Recorder</th>
      );
    }
  }
  renderRecorder(allergyIntolerances ){
    if (!this.props.hideRecorder) {
      return (
        <td className='patient'>{ get(allergyIntolerances, 'recorder.display') }</td>       );
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

      // DSTU v4
      if(get(this.data.allergyIntolerances[i], 'onsetDateTime')){
        newRow.onset = moment(get(this.data.allergyIntolerances[i], 'onsetDateTime')).format("YYYY-MM-DD");
      }

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
          { this.renderToggles(this.data.allergyIntolerances[i]) }
          { this.renderIdentifier(this.data.allergyIntolerances[i]) }
          <td className='reaction'>{ newRow.reaction }</td>
          <td className='criticality'>{ newRow.criticality }</td>
          { this.renderType(this.data.allergyIntolerances[i]) }
          { this.renderCategory(this.data.allergyIntolerances[i]) }
          { this.renderPatient(this.data.allergyIntolerances[i]) }
          { this.renderRecorder(this.data.allergyIntolerances[i]) }
          {/* <td className='patient'>{ newRow.patient }</td> */}
          {/* <td className='recorder'>{ newRow.recorder }</td> */}
          <td className='onset'>{ newRow.onset }</td>
          { this.renderClinicalStatus(this.data.allergyIntolerances[i]) }
          { this.renderVerificationStatus(this.data.allergyIntolerances[i]) }
          { this.renderDate(this.data.allergyIntolerances[i]) }
        </tr>
      )
    }

    return(
      <Table id='allergyIntolerancesTable' hover >
        <thead>
          <tr>
            { this.renderTogglesHeader() }
            { this.renderIdentifierHeader() }
            <th className='reaction'>Reaction</th>
            <th className='criticality'>Criticality</th>
            { this.renderTypeHeader() }
            { this.renderCategoryHeader() }
            { this.renderPatientHeader() }
            { this.renderRecorderHeader() }
            {/* <th className='patient'>Patient</th> */}
            {/* <th className='recorder'>Recorder</th> */}
            <th className='onsert'>Onset</th>
            { this.renderClinicalStatusHeader() }
            { this.renderVerificationStatusHeader() }
            { this.renderDateHeader() }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


AllergyIntolerancesTable.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,

  hideToggle: PropTypes.bool,
  hideIdentifier: PropTypes.bool,
  hideDate: PropTypes.bool,
  hideStatus: PropTypes.bool,
  hideVerification: PropTypes.bool,
  hideType: PropTypes.bool,
  hideCategory: PropTypes.bool,

  hidePatient: PropTypes.bool,
  hideRecorder: PropTypes.bool,
  sourceReference: PropTypes.bool,
  disableBarcodes: PropTypes.bool,
  limit: PropTypes.number,
  query: PropTypes.object,
  patient: PropTypes.string,
  patientDisplay: PropTypes.string,
  sort: PropTypes.string
  // onPatientClick: PropTypes.func
};



ReactMixin(AllergyIntolerancesTable.prototype, ReactMeteorData);
export default AllergyIntolerancesTable;