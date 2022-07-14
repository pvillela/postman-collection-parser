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
export async function processRequest(
  path: string,
  reqMethod: string,
  reqBody: unknown,
  expectedStatus: number
): Promise<ProcessedResp> {
  await Promise.resolve()

  if (reqBody === "normal") {
    const respStatus = path === "good" ? 200 : 400
    checkRespStatus(expectedStatus, respStatus)
    return {
      kind: "RespA",
      x: 42
    }
  } else if (reqBody === "error") {
    const respStatus = path === "good" ? 400 : 200
    checkRespStatus(expectedStatus, respStatus)
    return {
      kind: "RespA",
      x: 42
    }
  }

  return {
    kind: "RespA",
    x: 42
  }
}

export type RespA = {
  kind: "RespA"
  x: number
}

export type ErrResp = {
  kind: "ErrResp"
  y: string
}

export type ProcessedResp = RespA | ErrResp

function checkRespStatus(expectedStatus: number, respStatus: number) {
  if (expectedStatus !== respStatus) throw new Error(`Expected response status ${expectedStatus}, got ${respStatus}`)
}
