
// create the object using our BaseModel
AllergyIntollerance = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
AllergyIntollerance.prototype._collection = AllergyIntollerances;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
AllergyIntollerances = new Mongo.Collection('AllergyIntollerances');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
AllergyIntollerances._transform = function (document) {
  return new AllergyIntollerance(document);
};


if (Meteor.isClient){
  Meteor.subscribe("AllergyIntollerances");
}

if (Meteor.isServer){
  Meteor.publish("AllergyIntollerances", function (argument){
    if (this.userId) {
      return AllergyIntollerances.find();
    } else {
      return [];
    }
  });
}



AllergyIntolleranceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "AllergyIntollerance"
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

AllergyIntollerances.attachSchema(AllergyIntolleranceSchema);
