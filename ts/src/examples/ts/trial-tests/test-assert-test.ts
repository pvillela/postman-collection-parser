import * as assert from "assert"
import * as tu from "../test-utils"

test("Manual example 2", async () => {
  // Test preparation

  const reqMethod = "POST"
  const path = "/foo"
  const expectedStatus = 200

  const reqBody = 0

  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required.
  const pResBody = await tu.processRequest(path, reqMethod, reqBody, expectedStatus)

  // Assertions

  assert.equal(1, 2, "dummy test condition")
})
