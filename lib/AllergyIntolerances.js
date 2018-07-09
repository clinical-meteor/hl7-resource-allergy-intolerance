if(Package['clinical:autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  Your app has the 'clinical-autopublish' package installed.");
  console.log("Any protected health information (PHI) stored in this app should be audited."); 
  console.log("Please consider writing secure publish/subscribe functions and uninstalling.");  
  console.log("");  
  console.log("meteor remove clinical:autopublish");  
  console.log("");  
}
if(Package['autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");  
  console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
  console.log("");  
  console.log("meteor remove autopublish");  
  console.log("meteor add clinical:autopublish");  
  console.log("");  
}


// create the object using our BaseModel
AllergyIntolerance = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
AllergyIntolerance.prototype._collection = AllergyIntolerances;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
if(typeof AllergyIntolerances === 'undefined'){
  if(Package['clinical:autopublish']){
    AllergyIntolerances = new Mongo.Collection('AllergyIntolerances');
  } else {
    AllergyIntolerances = new Mongo.Collection('AllergyIntolerances', {connection: null});
  }
}

// //Add the transform to the collection since Meteor.users is pre-defined by the accounts package
// AllergyIntolerances._transform = function (document) {
//   return new AllergyIntolerance(document);
// };


AllergyIntoleranceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "AllergyIntolerance"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "clinicalStatus" : {
    optional: true,
    type: String,
    allowedValues: ['active', 'inactive', 'resolved']
  },
  "verificationStatus" : {
    optional: true,
    type: String,
    allowedValues: ['unconfirmed', 'confirmed', 'refuted', 'entered-in-error']
  },
  "type" : {
    optional: true,
    type: String
  },
  "category" : {
    optional: true,
    type: [ String ],
    allowedValues: ['food', 'medication', 'environment', 'biologic']
  },
  "criticality" : {
    optional: true,
    type: String,
    allowedValues: ['CRITL', 'CRITH', 'CRITU'] // DSTU2
    // allowedValues: ['low', 'high', 'unable-to-assess'] // DSTU3
  },
  "code" : {
    optional: true,
    type: CodeableConcept
  },
  "patient" : {
    optional: true,
    type: ReferenceSchema
  },
  "onsetDateTime" : {
    optional: true,
    type: Date
  },
  "onsetAge" : {
    optional: true,
    type: Number
  },
  "onsetPeriod" : {
    optional: true,
    type: PeriodSchema
  },
  "onsetRange" : {
    optional: true,
    type: Range
  },
  "onsetString" : {
    optional: true,
    type: String
  },
  "recorder" : {
    optional: true,
    type: ReferenceSchema
  },
  "asserter" : {
    optional: true,
    type: ReferenceSchema
  },
  "lastOccurence" : {
    optional: true,
    type: Date
  },
  "note" : {
    optional: true,
    type: [AnnotationSchema]
  },
  "reaction.$.substance" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reaction.$.manifestation" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "reaction.$.description" : {
    optional: true,
    type: String
  },
  "reaction.$.onset" : {
    optional: true,
    type: Date
  },
  "reaction.$.severity" : {
    optional: true,
    type: String
  },
  "reaction.$.exposureRoute" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reaction.$.note" : {
    optional: true,
    type: AnnotationSchema
  }
});

AllergyIntolerances.attachSchema(AllergyIntoleranceSchema);

export default { AllergyIntolerance, AllergyIntolerances, AllergyIntoleranceSchema };