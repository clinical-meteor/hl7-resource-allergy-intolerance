##clinical:hl7-resource-allergy-intolerance

HL7 FHIR Resource - AllergyIntolerance


===============================
#### Conformance Statement  

The resource in this package implements the FHIR Patient Resource schema provided at  [https://www.hl7.org/fhir/allergyintolerance.html](https://www.hl7.org/fhir/allergyintolerance.html).  


===============================
#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-allergy-intolerance

# to initialize default data
INITIALIZE=true meteor
````

===============================
#### Example   

```js
let peanutAllergy = {

}
AllergyIntolerances.insert(peanutAllergy);
```

===============================
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



===============================
#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).




===============================
#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
