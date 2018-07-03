## clinical:hl7-resource-allergy-intolerance

#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


#### Integration & Verification Tests  

[![CircleCI](https://circleci.com/gh/clinical-meteor/hl7-resource-allergy-intolerance/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/hl7-resource-allergy-intolerance/tree/master)


#### API Reference  

This package implements the FHIR List resource schema provided at  [https://www.hl7.org/fhir/DSTU2/allergyintolerance.html](https://www.hl7.org/fhir/DSTU2/allergyintolerance.html).  


#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-allergy-intolerance

# to initialize default data
INITIALIZE=true meteor
````


#### Example   

```js
let peanutAllergy = {

}
AllergyIntolerances.insert(peanutAllergy);
```

#### Extending the Schema

```js
ExtendedAllergyIntoleranceSchema = new SimpleSchema([
  AllergyIntoleranceSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
AllergyIntolerances.attachSchema( ExtendedAllergyIntoleranceSchema );
```


#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).



#### References  

[FDA - Food Allergies: What You Need To Know](https://www.fda.gov/food/resourcesforyou/consumers/ucm079311.htm)  
[FDA - Food Facts](https://www.fda.gov/downloads/Food/ResourcesForYou/Consumers/UCM220117.pdf)  


#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
