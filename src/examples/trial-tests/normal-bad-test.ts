import assert from "assert"
import * as tu from "@src/examples/test-utils"

const reqBody = "normal"

test("normal-bad", async () => {
  // Test preparation

  const reqMethod = "POST"
  const path = "bad"
  const expectedStatus = 200

  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required.
  const resBody = await tu.processRequest(path, reqMethod, reqBody, expectedStatus)

  // Assertions

  assert(resBody.kind === "RespA")

  assert.equal(resBody.x, 42, "Response must be right.")
})
