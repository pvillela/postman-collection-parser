export function template(
  testName: string,
  reqMethod: string,
  path: string,
  reqBody: unknown,
  testArr: string[],
  dirDepth: number
): string {
  const importPrefix = "../".repeat(dirDepth)

  return `// import with path alias
import { processRequest } from "@src/examples/test-utils/process-request"

// import without path alias
// import { processRequest } from "${importPrefix}test-utils/process-request"

test("${testName}", async () => {
  // Test preparation
  
  const reqMethod = "${reqMethod}"
  const path = "${path}"
  const expectedStatus = 9999 // TODO: put expected status here
  
  const reqBody = 
${indent(JSON.stringify(reqBody, null, 2), 4)}
  
  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required.
  const resBody = await processRequest(path, reqMethod, reqBody, expectedStatus)
  
  // Assertions
  
  // TODO: fix test assertions
  
  expect(true).toBe(true)
  
${indent(testArr.join("\n"), 1, "  // ")}
})
`
}

function indent(str: string, count: number, indentation: string = " "): string {
  return str.replace(/^/gm, indentation.repeat(count));
}

