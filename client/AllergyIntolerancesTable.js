import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

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
      displayDates: false
    }

    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }

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
        name: '',
        type: '',
        category: '',
        clinicalStatus: '',
        verificationStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };

      newRow.name = get(this.data.allergyIntolerances[i], 'identifier[0].value');
      newRow.clinicalStatus = get(this.data.allergyIntolerances[i], 'clinicalStatus');
      newRow.verificationStatus = get(this.data.allergyIntolerances[i], 'verificationStatus');
      newRow.type = get(this.data.allergyIntolerances[i], 'type');
      newRow.category = get(this.data.allergyIntolerances[i], 'category[0]');
      if(get(this.data.allergyIntolerances[i], 'code.coding[0]')){            
        newRow.snomedCode = get(this.data.allergyIntolerances[i], 'code.coding[0].code');
        newRow.snomedDisplay = get(this.data.allergyIntolerances[i], 'code.coding[0].display');
      }

      tableRows.push(
        <tr key={i} className="allergyIntoleranceRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.allergyIntolerances[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.allergyIntolerances[i]) }
          <td className='identifier'>{ newRow.name }</td>
          <td className='clinicalStatus'>{ newRow.clinicalStatus }</td>
          <td className='verificationStatus'>{ newRow.verificationStatus }</td>
          <td className='type'>{ newRow.type }</td>
          <td className='category'>{ newRow.category }</td>
          { this.renderDate(this.data.displayDates, this.data.allergyIntolerances[i].assertedDate) }
        </tr>
      )
    }

    return(
      <Table id='allergyIntolerancesTable' hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            <th className='identifier'>Name</th>
            <th className='clinicalStatus'>Status</th>
            <th className='verificationStatus'>Verification</th>
            <th className='type'>Type</th>
            <th className='category'>Category</th>
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