import assert from "assert"

// import with path alias
import * as tu from "@src/examples/test-utils"

// import without path alias
// import * as tu from "../../../../test-utils"
  
const reqBody = 
  {
    "user": {
      "email": "celeb_{{EMAIL}}",
      "password": "{{PASSWORD}}",
      "username": "celeb_{{USERNAME}}"
    }
  }

test("Register Celeb", async () => {
  // Test preparation
  
  const reqMethod = "POST"
  const path = "/users"
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
