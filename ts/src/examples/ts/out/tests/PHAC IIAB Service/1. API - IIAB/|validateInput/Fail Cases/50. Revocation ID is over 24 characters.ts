import assert from "assert"

// import with path alias
import * as tu from "../../../../../../../../examples/test-utils"

// import without path alias
// import * as tu from "../../../../../../test-utils"
  
const reqBody = 
  {
    "rid": "78533x9493z0b234c1234d80a",
    "languagePreference": "en",
    "iiabPayload": {
      "iss": "https://master.d37rf8zs4iv4wx.amplifyapp.com",
      "patient": {
        "familyName": "Smith",
        "givenName": [
          "John"
        ],
        "birthDate": "2001-04-23"
      },
      "vaccinations": [
        {
          "securityCode": "IAL1.4",
          "vaccinationCodeCodingCvx": "207",
          "performerNameActorDisplay": "ON, Canada",
          "manufacturerIdentifierValue": "MOD",
          "occurrenceDate": "2021-04-23",
          "vaccineLotNumber": "0000201"
        },
        {
          "securityCode": "IAL1.4",
          "vaccinationCodeCodingCvx": "207",
          "performerNameActorDisplay": "ON, Canada",
          "manufacturerIdentifierValue": "MOD",
          "occurrenceDate": "2021-05-23",
          "vaccineLotNumber": "0000202"
        }
      ]
    }
  }

test("50. Revocation ID is over 24 characters", async () => {
  // Test preparation
  
  const reqMethod = "POST"
  const path = "/{{validateInputEndpoint}}"
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
