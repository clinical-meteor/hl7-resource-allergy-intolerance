
// create the object using our BaseModel
AllergyIntolerance = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
AllergyIntolerance.prototype._collection = AllergyIntolerances;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
AllergyIntolerances = new Mongo.Collection('AllergyIntolerances');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
AllergyIntolerances._transform = function (document) {
  return new AllergyIntolerance(document);
};


if (Meteor.isClient){
  Meteor.subscribe("AllergyIntolerances");
}

if (Meteor.isServer){
  Meteor.publish("AllergyIntolerances", function (argument){
    if (this.userId) {
      return AllergyIntolerances.find();
    } else {
      return [];
    }
  });
}



AllergyIntoleranceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "AllergyIntolerance"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "onset" : {
    optional: true,
    type: Date
  },
  "recordedDate" : {
    optional: true,
    type: Date
  },
  "recorder" : {
    optional: true,
    type: ReferenceSchema
  },
  "patient" : {
    optional: true,
    type: ReferenceSchema
  },
  "reporter" : {
    optional: true,
    type: ReferenceSchema
  },
  "substance" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "status" : {
    optional: true,
    type: String
  },
  "criticality" : {
    optional: true,
    type: String
  },
  "type" : {
    optional: true,
    type: String
  },
  "category" : {
    optional: true,
    type: String
  },
  "lastOccurence" : {
    optional: true,
    type: Date
  },
  "note" : {
    optional: true,
    type: AnnotationSchema
  },
  "reaction.$.substance" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reaction.$.certainty" : {
    optional: true,
    type: String
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
