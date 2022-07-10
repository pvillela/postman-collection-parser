/**
 * Mock example processRequest function. This function should contain logic to:
 * - call the target endpoint
 * - assert the expected response code
 * - transform the response body if required
 *
 * @param path The target endpoint's path.
 * @param reqMethod The request method (GET, POST, PUT, PATCH, or DELETE).
 * @param reqBody The request body.
 * @param expectedStatus The expected response status code.
 */
export function processRequest(
  path: string,
  reqMethod: string,
  reqBody: unknown,
  expectedStatus: number
): Promise<unknown> {
  return Promise.resolve(undefined)
}
