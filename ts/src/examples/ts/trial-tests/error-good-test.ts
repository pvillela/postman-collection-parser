import assert from "assert"
import * as tu from "../test-utils"

const reqBody = "error"

test("error-good", async () => {
  // Test preparation

  const reqMethod = "POST"
  const path = "good"
  const expectedStatus = 400

  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required.
  const resBody = await tu.processRequest(path, reqMethod, reqBody, expectedStatus)

  // Assertions

  assert(resBody.kind === "ErrResp")

  assert.equal(resBody.y, "Error was as expected.", "Response must be right.")
})
