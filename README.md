##clinical:hl7-resource-allergy-intollerance

HL7 FHIR Resource - AllergyIntollerance


===============================
#### Conformance Statement  

The resource in this package implements the FHIR Patient Resource schema provided at  [https://www.hl7.org/fhir/allergyintollerance.html](https://www.hl7.org/fhir/allergyintollerance.html).  


===============================
#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-allergy-intollerance

# to initialize default data
INITIALIZE=true meteor
````

===============================
#### Example   

```js
let peanutAllergy = {

}
AllergyIntollerances.insert(peanutAllergy);
```

===============================
#### Extending the Schema

```js
ExtendedAllergyIntolleranceSchema = new SimpleSchema([
  AllergyIntolleranceSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
AllergyIntollerances.attachSchema( ExtendedAllergyIntolleranceSchema );
```



===============================
#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).




===============================
#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
