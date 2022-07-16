/*
   This implementation of the Postman collection parser strives for type-safety and
   depends Postman library type definitions. There are no ESLint exclusions or
   violations in this module.
 */

import { promises as fsp } from "fs";
import { CollectionDefinition, ItemDefinition, ItemGroupDefinition } from "postman-collection"
import assert from "assert";

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
  testArr: string[] | undefined,
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
  await makeDirIfNeeded(outDir)

  const collName = escapeName(coll.info?.name)
  const collDir = `${outDir}/${collName}`
  await makeCleanDir(collDir)

  const collItems = coll.item
  assert(collItems, "coll.item expected to be defined")
  const completion = collItems.map((item) => {
    return handleItem(collDir, item, template, baseDirDepth)
  })
  await Promise.all(completion)
}

// const maxCalls = 10 // for development only
// let numCalls = 0 // for development only

async function handleItem(
  parentDir: string,
  item: ItemDefinition | ItemGroupDefinition,
  template: Template,
  dirDepth: number,
): Promise<void> {
  // if (++numCalls > maxCalls) return // for development only

  const name = escapeName(item.name)

  const subItems = (item as ItemGroupDefinition).item

  if (subItems) {
    const subDir = parentDir + "/" + name
    await fsp.mkdir(subDir)
    const completion = subItems.map((subItem) => {
      return handleItem(subDir, subItem, template, dirDepth+1)
    })
    await Promise.all(completion)
  } else {
    console.log("***** name", name)
    assert("request" in item, "item expected to be of type ItemDefintion")

    const request = item.request
    console.log("****** request", request)
    assert(request, "request expected to be defined")

    const reqMethod = request.method
    console.log("****** reqMethod", reqMethod)
    assert(reqMethod, "request.method expected to be defined")

    assert(typeof request.url === "object",
      "request.url expected to be of type UrlDefinition")
    const path = request.url.path
    console.log("****** path", path)
    assert(typeof path === "object", "request.url.path expected to be of type string[]")
    const pathStr = "/" + path.join("/")

    const reqBody: unknown = request.body?.raw && JSON.parse(request.body.raw)
    console.log("****** reqBody", reqBody)

    const events = item.events
    const testArr = events?.map((event) => {
      const script = event.script
      assert(typeof script === "object" && "exec" in script,
        "event.script expected to be of type ScriptDefinition")
      const exec = script.exec
      assert(typeof exec === "object", "script.exec expected to be of type string[]")
      const tests = exec.join("\n")
      console.log(">> tests -------------------")
      console.log(tests)
      return tests
    })

    await fsp.writeFile(
      `${parentDir}/${name}.ts`,
      template(name, reqMethod, pathStr, reqBody, testArr, dirDepth)
    )
  }
}

function escapeName(name: string | undefined): string {
  assert(name, "name expected to be defined")
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

async function makeDirIfNeeded(path: string): Promise<void> {
  if (!await pathExists(path)) await fsp.mkdir(path, { recursive: true })
}

async function makeCleanDir(path: string): Promise<void> {
  if (await pathExists(path)) await fsp.rm(path, { force: true, recursive: true })
  await fsp.mkdir(path, { recursive: true })
}
