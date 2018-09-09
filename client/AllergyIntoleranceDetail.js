// =======================================================================
// Using DSTU2  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// https://www.hl7.org/fhir/DSTU2/allergyintolerance.html
//
//
// =======================================================================

import { CardActions, CardText, DatePicker, RaisedButton, TextField, SelectField, MenuItem } from 'material-ui';
import { Col, Grid, Row } from 'react-bootstrap';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React, { Component } from 'react';
import update from 'immutability-helper';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { get, set, setWith, clone, cloneDeep } from 'lodash';
import PropTypes from 'prop-types';


export class AllergyIntoleranceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allergyIntoleranceId: false,
      allergy: {
        resourceType: "AllergyIntolerance",
          identifier: [{
            value: ''
          }],
          clinicalStatus: 'active',
          verificationStatus: 'unconfirmed',
          type: 'allergy',
          category: ['food'],
          code: null,
          patient: {
            display: ''
          },
          recorder: {
            display: ''
          },
          onsetDateTime: null,
          reaction: [{
            description: ''
          }],
          criticality: 'low'
      },
      form: {
        allergyIdentifier: '',
        reactionDescription: '',
        clinicalStatus: 0,
        verificationStatus: 0,
        category: 0,
        type: 0,
        criticality: 0,
        patientDisplay: '',
        recorderDisplay: ''
      }
    }
  }
  dehydrateFhirResource(allergyIntolerance) {

    let formData = Object.assign({}, this.state.form);

    formData.allergyIdentifier = get(allergyIntolerance, 'identifier[0].value')
    formData.reactionDescription = get(allergyIntolerance, 'reaction[0].description')    
    formData.patientDisplay = get(allergyIntolerance, 'patient.display')
    formData.recorderDisplay = get(allergyIntolerance, 'recorder.display')

    switch (get(allergyIntolerance, 'clinicalStatus')) {
      case 'active':
        formData.clinicalStatus = 0;  
        break;
      case 'inactive':
        formData.clinicalStatus = 1;         
        break;
      case 'resolved':
        formData.clinicalStatus = 2;     
        break;      
    }

    switch (get(allergyIntolerance, 'verificationStatus')) {
      case 'unconfirmed':
        formData.verificationStatus = 0;  
        break;
      case 'confirmed':
        formData.verificationStatus = 1;         
        break;
      case 'refuted':
        formData.verificationStatus = 2;     
        break;      
      case 'entered-in-error':
        formData.verificationStatus = 3;     
        break;      
    }

    switch (get(allergyIntolerance, 'category')) {
      case 'food':
        formData.category = 0;  
        break;
      case 'medication':
        formData.category = 1;         
        break;
      case 'environment':
        formData.category = 2;     
        break;      
      case 'biologic':
        formData.category = 3;     
        break;      
    }

    switch (get(allergyIntolerance, 'type')) {
      case 'allergy':
        formData.type = 0;  
        break;
      case 'intollerance':
        formData.type = 1;         
        break;
    }

    switch (get(allergyIntolerance, 'criticality')) {
      case 'low':
        formData.criticality = 0;  
        break;
      case 'high':
        formData.criticality = 1;         
        break;
      case 'unable-to-assess':
        formData.criticality = 2;     
        break;      
    }
    return formData;
  }
  shouldComponentUpdate(nextProps){
    process.env.NODE_ENV === "test" && console.log('AllergyIntoleranceDetail.shouldComponentUpdate()', nextProps, this.state)
    let shouldUpdate = true;

    // both false; don't take any more updates
    if(nextProps.allergy === this.state.allergy){
      shouldUpdate = false;
    }

    // received an allergie from the table; okay lets update again
    if(nextProps.allergyIntoleranceId !== this.state.allergyIntoleranceId){
      this.setState({allergyIntoleranceId: nextProps.allergyIntoleranceId})     
      this.setState({allergy: nextProps.allergy})     
      this.setState({form: this.dehydrateFhirResource(nextProps.allergy)})     
      shouldUpdate = true;
    }
 
    return shouldUpdate;
  }

  getMeteorData() {
    let data = {
      allergyIntoleranceId: this.props.allergyIntoleranceId,
      allergy: false,
      form: this.state.form,
      showDatePicker: false      
    };

    if(this.props.showDatePicker){
      data.showDatePicker = this.props.showDatePicker
    }
    if(this.props.allergy){
      data.allergy = this.props.allergy;
    }
    
    console.log('AllergyIntoleranceDetail[data]', data);
    return data;
  }
  renderDatePicker(showDatePicker, datePickerValue){
    if (typeof datePickerValue === "string"){
      datePickerValue = new Date(datePickerValue);
    }
    if (showDatePicker) {
      return (
        <DatePicker 
          name='datePicker'
          hintText="Date of Confirmation" 
          container="inline" 
          mode="landscape"
          value={ datePickerValue ? datePickerValue : null}    
          onChange={ this.changeState.bind(this, 'datePicker')}      
          />
      );
    }
  }
  render() {
    if(process.env.NODE_ENV === "test") console.log('AllergyIntoleranceDetail.render()', this.state)
    let formData = this.state.form;

    return (
      <div id={this.props.id} className="allergyIntoleranceDetail">
        <CardText>
          <Row>
            <Col md={3} >
              <SelectField
                id='clinicalStatusInput'
                ref='clinicalStatus'
                name='clinicalStatus'
                floatingLabelText='Clinical Status'
                value={ get(formData, 'clinicalStatus', '') }
                onChange={ this.changeState.bind(this, 'clinicalStatus')}
                floatingLabelFixed={true}
                fullWidth
              >
                <MenuItem value={0} primaryText="active" />
                <MenuItem value={1} primaryText="inactive" />
                <MenuItem value={2} primaryText="resolved" />
              </SelectField>


            </Col>
            <Col md={3} >
              <SelectField
                id='verificationStatusInput'
                ref='verificationStatus'
                name='verificationStatus'
                floatingLabelText='Verification Status'
                value={ get(formData, 'verificationStatus', '') }
                onChange={ this.changeState.bind(this, 'verificationStatus')}
                floatingLabelFixed={true}
                fullWidth
              >
                <MenuItem value={0} primaryText="unconfirmed" />
                <MenuItem value={1} primaryText="confirmed" />
                <MenuItem value={2} primaryText="refuted" />
                <MenuItem value={3} primaryText="entered-in-error" />
              </SelectField>

            </Col>

            <Col md={3} >
              <SelectField
                  id='categoryInput'
                  ref='category'
                  name='category'
                  floatingLabelText='Category'
                  value={ get(formData, 'category', '') }
                  onChange={ this.changeState.bind(this, 'category')}
                  floatingLabelFixed={true}
                  fullWidth
                >
                  <MenuItem value={0} primaryText="food" />
                  <MenuItem value={1} primaryText="medication" />
                  <MenuItem value={2} primaryText="environment" />
                  <MenuItem value={3} primaryText="biologic" />
                </SelectField>

            </Col>
            <Col md={3} >
              <SelectField
                id='typeInput'
                ref='type'
                name='type'
                floatingLabelText='Type'
                value={ get(formData, 'type', '') }
                onChange={ this.changeState.bind(this, 'type')}
                floatingLabelFixed={true}
                fullWidth
              >
                <MenuItem value={0} primaryText="allergy" />
                <MenuItem value={1} primaryText="intollerance" />
              </SelectField>

            </Col>
          </Row>

          <Row>
            <Col md={4} >
              <TextField
                id='identifierInput'
                ref='identifier'
                name='identifier'
                floatingLabelText='Identifier'            
                value={ get(formData, 'allergyIdentifier', '') }
                onChange={ this.changeState.bind(this, 'identifier')}
                hintText="Shellfish"
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={4} >
              <TextField
                id='reactionInput'
                ref='reaction'
                name='reaction'
                floatingLabelText='Reaction Description'
                value={ get(formData, 'reactionDescription', '') }
                onChange={ this.changeState.bind(this, 'reaction')}
                hintText="Hives"
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={4} >
              <SelectField
                id='criticalityInput'
                ref='criticality'
                name='criticality'
                floatingLabelText='Criticality'
                value={ get(formData, 'criticality', '') }
                onChange={ this.changeState.bind(this, 'criticality')}
                floatingLabelFixed={true}
                fullWidth
              >
                <MenuItem value={0} primaryText="low" />
                <MenuItem value={1} primaryText="high" />
                <MenuItem value={2} primaryText="unable-to-assess" />
              </SelectField>

            </Col>            
          </Row>
          <Row>
            <Col md={4} >
              <TextField
                id='patientDisplayInput'
                ref='patientDisplay'
                name='patientDisplay'
                floatingLabelText='Patient'
                value={ get(formData, 'patientDisplay', '') }
                onChange={ this.changeState.bind(this, 'patientDisplay')}
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={4} >
              <TextField
                id='recorderDisplayInput'
                ref='recorderDisplay'
                name='recorderDisplay'
                floatingLabelText='Recorder'
                value={ get(formData, 'recorderDisplay', '') }
                onChange={ this.changeState.bind(this, 'recorderDisplay')}
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
          </Row>

          <br/>
          { this.renderDatePicker(this.data.showDatePicker, get(this, 'data.allergy.onsetDateTime') ) }
          <br/>
          

        </CardText>
        <CardActions>
          { this.determineButtons(this.state.allergyIntoleranceId ) }
        </CardActions>
      </div>
    );
  }

  determineButtons(allergyId){
    if (allergyId) {
      return (
        <div>
          <RaisedButton id="updateAllergyIntoleranceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this) } style={{marginRight: '20px'}} />
          <RaisedButton id="deleteAllergyIntoleranceButton" label="Delete" onClick={this.handleDeleteButton.bind(this) } />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveAllergyIntoleranceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this) } />
      );
    }
  }
  updateFormData(formData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("AllergyIntoleranceDetail.updateFormData", formData, field, textValue);

    switch (field) {
      case "identifier":
        set(formData, 'allergyIdentifier', textValue)
        break;
      case "reaction":
        set(formData, 'reactionDescription', textValue)
        break;        
      case "verificationStatus":
        set(formData, 'verificationStatus', textValue)
        break;
      case "clinicalStatus":
        set(formData, 'clinicalStatus', textValue)
        break;
      case "type":
        set(formData, 'type', textValue)
        break;
      case "category":
        set(formData, 'category', textValue)
        break;
      case "patientDisplay":
        set(formData, 'patientDisplay', textValue)
        break;
      case "recorderDisplay":
        set(formData, 'recorderDisplay', textValue)
        break;
      case "datePicker":
        set(formData, 'onsetDateTime', textValue)
        break;
      case "criticality":
        set(formData, 'criticality', textValue)
        break;  
      default:
    }

    if(process.env.NODE_ENV === "test") console.log("formData", formData);

    return formData;
  }
  updateAllergy(allergyData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("AllergyIntoleranceDetail.updateAllergy", allergyData, field, textValue);

    switch (field) {
      case "identifier":
        setWith(allergyData, 'identifier[0].value', textValue, Object)
        break;
      case "reaction":
        setWith(allergyData, 'reaction[0].description', textValue, Object)
        break;        
      case "verificationStatus":
        switch (textValue) {
          case 0:
            set(allergyData, 'verificationStatus', 'unconfirmed')
            break;
          case 1:
            set(allergyData, 'verificationStatus', 'confirmed')
            break;
          case 2:
            set(allergyData, 'verificationStatus', 'refuted')
            break;
          case 3:
            set(allergyData, 'verificationStatus', 'entered-in-error')
            break;
        }       
        break;
      case "clinicalStatus":
        switch (textValue) {
          case 0:
            set(allergyData, 'clinicalStatus', 'active')
            break;
          case 1:
            set(allergyData, 'clinicalStatus', 'inactive')
            break;
          case 2:
            set(allergyData, 'clinicalStatus', 'resolved')
            break;
        }        
        break;
      case "type":
        switch (textValue) {
          case 0:
            set(allergyData, 'type', 'allergy')
            break;
          case 1:
            set(allergyData, 'type', 'intolerance')
            break;
        }   
        break;
      case "category":
        switch (textValue) {
          case 0:
            set(allergyData, 'category', ['food'])
            break;
          case 1:
            set(allergyData, 'category', ['medication'])
            break;
          case 2:
            set(allergyData, 'category', ['environment'])
            break;
          case 3:
            set(allergyData, 'category', ['biologic'])
            break;
        }   
        break;
      case "datePicker":
        set(allergyData, 'onsetDateTime', textValue)
        break;
      case "criticality":
        switch (textValue) {
          case 0:
            set(allergyData, 'criticality', 'low')
            break;
          case 1:
            set(allergyData, 'criticality', 'high')
            break;
          case 2:
            set(allergyData, 'criticality', 'unable-to-assess')
            break;
        }   
        break;
      default:
    }

    if(process.env.NODE_ENV === "test") console.log("allergyData", allergyData);

    return allergyData;
  }
  componentDidUpdate(props){
    if(process.env.NODE_ENV === "test") console.log('AllergyIntoleranceDetail.componentDidUpdate()', props, this.state)
  }
  changeState(field, event, textValue){
    if(process.env.NODE_ENV === "test") console.log("AllergyIntoleranceDetail.changeState", field, textValue);
    if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

    let formData = Object.assign({}, this.state.form);
    let allergyData = Object.assign({}, this.state.allergy);

    formData = this.updateFormData(formData, field, textValue);
    allergyData = this.updateAllergy(allergyData, field, textValue);

    if(process.env.NODE_ENV === "test") console.log("allergyData", allergyData);
    if(process.env.NODE_ENV === "test") console.log("formData", formData);

    this.setState({allergy: allergyData})
    this.setState({form: formData})
  }

  handleSaveButton(){
    console.log('Saving a new Allergy...', this.state)

    let self = this;
    let fhirAllergyData = Object.assign({}, this.state.allergy);

    if(process.env.NODE_ENV === "test") console.log('fhirAllergyData', fhirAllergyData);


    if (this.state.allergyIntoleranceId) {
      if(process.env.NODE_ENV === "test") console.log("Updating allergyIntolerance...");
      delete fhirAllergyData._id;

      AllergyIntolerances.update(
        {_id: this.state.allergyIntoleranceId}, {$set: fhirAllergyData }, {
          validate: true, 
          filter: false, 
          removeEmptyStrings: false
        }, function(error, result) {
          if (error) {
            console.log("error", error);
            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "AllergyIntolerances", recordId: self.data.allergyIntoleranceId});
            Session.set('allergyIntolerancePageTabIndex', 1);
            Session.set('selectedAllergyIntolerance', false);
            Bert.alert('AllergyIntolerance updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("Create a new allergyIntolerance", fhirAllergyData);

      AllergyIntolerances.insert(fhirAllergyData, {
        validate: true, 
        filter: false, 
        removeEmptyStrings: false
      }, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "AllergyIntolerances", recordId: self.data.allergyIntoleranceId});
          Session.set('allergyIntolerancePageTabIndex', 1);
          Session.set('selectedAllergyIntolerance', false);
          Bert.alert('AllergyIntolerance added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('allergyIntolerancePageTabIndex', 1);
  }

  handleDeleteButton(){
    let self = this;
    AllergyIntolerances.remove({_id: this.state.allergyIntoleranceId}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "AllergyIntolerances", recordId: self.data.allergyIntoleranceId});
        Session.set('allergyIntolerancePageTabIndex', 1);
        Session.set('selectedAllergyIntolerance', false);
        Bert.alert('AllergyIntolerance removed!', 'success');
      }
    });
  }
}

AllergyIntoleranceDetail.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,
  allergyIntoleranceId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  allergyIntolerance: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
ReactMixin(AllergyIntoleranceDetail.prototype, ReactMeteorData);
export default AllergyIntoleranceDetail;