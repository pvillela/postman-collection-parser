import assert from "assert"

// import with path alias
import * as tu from "../../../../../../../../examples/test-utils"

// import without path alias
// import * as tu from "../../../../../../test-utils"
  
const reqBody = 
  {
    "languagePreference": "en",
    "iiabPayload": {
      "iss": "https://master.d37rf8zs4iv4wx.amplifyapp.com",
      "patient": {
        "familyName": "Smith",
        "givenName": [
          "Jane"
        ],
        "birthDate": "1985-03-16"
      },
      "vaccinations": [
        {
          "securityCode": "IAL1.4",
          "vaccinationCodeCodingCvx": "208",
          "performerNameActorDisplay": "YT, Canada",
          "manufacturerIdentifierValue": "Pfizer",
          "occurrenceDate": "2021-05-14",
          "vaccineLotNumber": "EW4109"
        },
        {
          "securityCode": "IAL1.4",
          "vaccinationCodeCodingCvx": "208",
          "performerNameActorDisplay": "YT, Canada",
          "manufacturerIdentifierValue": "PFR",
          "occurrenceDate": "2021-06-27",
          "vaccineLotNumber": "FC9001"
        }
      ]
    }
  }

test("22. Manufacturer identifier incorrect", async () => {
  // Test preparation
  
  const reqMethod = "POST"
  const path = "/{{mobilePdfEndpoint}}"
  const expectedStatus = 9999 // TODO: put expected status here
  
  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required.
  const resBody = await tu.processRequest(path, reqMethod, reqBody, expectedStatus)
  
  // Assertions
  
  // TODO: fix test assertions
  
  expect(true).toBe(true)
  assert(true, "dummy assertion")
  assert.equal(1, 1, "one is one")
  

})
