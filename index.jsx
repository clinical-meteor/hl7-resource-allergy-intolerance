

import AllergyIntolerancesPage from './client/AllergyIntolerancesPage';
import AllergyIntolerancesTable from './client/AllergyIntolerancesTable';
import { AllergyIntolerance, AllergyIntolerances, AllergyIntoleranceSchema } from './lib/AllergyIntolerances';

var DynamicRoutes = [{
  'name': 'AllergyIntolerancesPage',
  'path': '/allergies',
  'component': AllergyIntolerancesPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Allergies & Intolerances',
  'to': '/allergies',
  'href': '/allergies'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  AllergyIntolerancesPage,
  AllergyIntolerancesTable,

  AllergyIntolerance,
  AllergyIntolerances,
  AllergyIntoleranceSchema
};


