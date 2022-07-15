import * as tu from "@src/examples/test-utils"

describe("Manual example 1", () => {
  // Test preparation

  const reqMethod = "POST"
  const path = "/foo"
  const expectedStatus = 200

  const reqBody = 0

  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required. Returns a promise.
  const pResBody = tu.processRequest(path, reqMethod, reqBody, expectedStatus)

  // Assertions

  tu.check("dummy test condition", true, true)
})
