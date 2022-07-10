import { promises as fsp } from "fs";
import { CollectionDefinition } from "postman-collection"

/**
 * Type of template function passed to parseCollection. The function parameters are
 * populated from the parsed Postman collection. The two non-obvious parameters are:
 *  - testArr: An array with the contents of the Tests tab for the test case.
 *  - dirDepth: The depth of the generated test file in the generated directory structure,
 *    computed with respect to a baseDirDepth passed to parseCollection.
 */
export type Template = (
  testName: string,
  reqMethod: string,
  reqPath: string,
  reqBody: unknown,
  testArr: string[],
  dirDepth: number,
) => string

/**
 * Converts a Postman collection into a directory structure with test files.
 *
 * @param outDir Base output directory.
 * @param coll Postman collection to be parsed.
 * @param template Template function used to generate test file contents.
 * @param baseDirDepth Relative depth of the base directory where the generated test directory
 *  structure will be located, computed with respect to a base directory from which imports
 *  will be defined in the template. This is needed if path aliases are not used for imports.
 */
export async function parseCollection(
  outDir: string,
  coll: CollectionDefinition,
  template: Template,
  baseDirDepth: number = 0
): Promise<void> {
  if (!await pathExists(outDir)) await fsp.mkdir(outDir, { recursive: true })

  const collName = escapeName((coll.info as any).name)
  const collDir = `${outDir}/${collName}`
  if (await pathExists(collDir)) await fsp.rm(collDir, { force: true, recursive: true })
  await fsp.mkdir(collDir, { recursive: true })

  const collItems = coll.item
  const completion: Promise<void>[] = []
  for (let i = 0; collItems && i < collItems.length; ++i) {
    completion.push(handleItem(collDir, collItems[i], template, baseDirDepth))
  }
  await Promise.all(completion)
}

// const maxCalls = 10 // for development only
// let numCalls = 0 // for development only

async function handleItem(
  parentDir: string,
  item: any,
  template: Template,
  dirDepth: number,
): Promise<void> {
  // if (++numCalls > maxCalls) return // for development only

  const name = escapeName(item.name as string)
  const subItems = item.item

  if (subItems) {
    const subDir = parentDir + "/" + name
    await fsp.mkdir(subDir)
    const completion: Promise<void>[] = []
    for (let i = 0; subItems && i < subItems.length; ++i) {
      completion.push(handleItem(subDir, subItems[i], template, dirDepth+1))
    }
    await Promise.all(completion)
  } else {
    console.log("***** name", name)

    const request = item.request
    console.log("****** request", request)

    const reqMethod = request.method
    console.log("****** reqMethod", reqMethod)

    const path = request.url.path
    console.log("****** path", path)

    const reqBody = request.body.raw && JSON.parse(request.body.raw)
    console.log("****** reqBody", reqBody)

    const event = item.event
    const testArr: string[] = []
    for (let k = 0; event && k < event.length; k++) {
      const exec = event[k].script.exec
      const tests = exec.join("\n")
      console.log(">> tests -------------------")
      console.log(tests)
      testArr.push(tests)
    }

    await fsp.writeFile(
      `${parentDir}/${name}.ts`,
      template(name, reqMethod, path, reqBody, testArr, dirDepth)
    )
  }
}

function escapeName(name: string): string {
  return name.replace(/\//g, "|")
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await fsp.stat(path)
  } catch (e) {
    return false
  }
  return true
}
