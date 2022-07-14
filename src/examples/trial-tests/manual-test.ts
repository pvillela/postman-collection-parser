import { check, pCheck, processRequest } from "@src/examples/test-utils"

describe("Manual example", () => {
  // Test preparation

  const reqMethod = "POST"
  const path = "/foo"
  const expectedStatus = 200

  const reqBody = 0

  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required. Returns a promise.
  const pResBody = processRequest(path, reqMethod, reqBody, expectedStatus)

  // Assertions

  check("dummy test condition", true, true)

  // pm.test("Status code is 200", function () {
  //     pm.response.to.have.status(200);
  // });
})
