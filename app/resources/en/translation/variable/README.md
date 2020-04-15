# Service Specific Text

### Adding a new service

Add a new file in the variable folder with the same name as the serviceId that will be passed to PCQ in the invokation parameters. i.e probate.json

Inside this file you will need to add objects with the structure `actor -> page/section name -> text key`. 
An example is shown below.

* The actor will need to be the same as is passed to PCQ in the invokation parameters. i.e `claimant`.
* The page/section name will be the same as the file names in the translation folder. 
* The text keys are defined in the translation files.

Ensure you define the same in the Welsh translation folder!

```$json
--- FILE: serviceId.json ---
{
  "actor": {
    "page/section-name1": {
      "text_key_1": "This is the text that will be shown"
    },
    "page/section-name1": {
      "text_key_2": "This is the text that will be shown"
    }
  }
}
```
