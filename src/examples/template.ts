export function indent(str: string, count: number, indent: string = " "): string {
  return str.replace(/^/gm, indent.repeat(count));
}

export function template(
  testName: string,
  reqMethod: string,
  path: string,
  reqBody: unknown,
  testArr: string[]
): string {
  return `import { processRequest } from "../../test-utils/process-request"

test("${testName}", () => {
  // Test preparation
  
  const reqMethod = "${reqMethod}"
  const path = "${path}"
  const expectedStatus = <PUT EXPECTED RESPONSE STATUS NUMBER HERE>
  
  const reqBody = 
${indent(JSON.stringify(reqBody, null, 2), 4)}
  
  const resBody = processRequest(path, reqMethod, reqBody, expectedStatus)
  
  // Assertions
  
${indent(testArr.join("\n"), 2)}
})
`
}
