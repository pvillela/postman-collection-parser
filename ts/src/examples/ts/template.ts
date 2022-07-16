export function template(
  testName: string,
  reqMethod: string,
  path: string,
  reqBody: unknown,
  testArr: string[] | undefined,
  dirDepth: number
): string {
  const importPrefix = "../".repeat(dirDepth)

  return `import assert from "assert"

// import with path alias
import * as tu from "@src/examples/test-utils"

// import without path alias
// import * as tu from "${importPrefix}test-utils"
  
const reqBody = 
${indent(JSON.stringify(reqBody, null, 2), 2)}

test("${testName}", async () => {
  // Test preparation
  
  const reqMethod = "${reqMethod}"
  const path = "${path}"
  const expectedStatus = 9999 // TODO: put expected status here
  
  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required.
  const resBody = await tu.processRequest(path, reqMethod, reqBody, expectedStatus)
  
  // Assertions
  
  // TODO: fix test assertions
  
  expect(true).toBe(true)
  assert(true, "dummy assertion")
  assert.equal(1, 1, "one is one")
  
${indent(testArr?.join("\n"), 1, "  // ")}
})
`
}

function indent(str: string | undefined, count: number, indentation: string = " "): string {
  return str?.replace(/^/gm, indentation.repeat(count)) || ""
}
