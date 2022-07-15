import { config } from "./config";
import { parseCollection } from "@src/lib/parse-collection-untyped";
import { template } from "./template";
import { CollectionDefinition } from "postman-collection";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const coll = require("../../postman-collections/Conduit.postman_collection.json") as CollectionDefinition

parseCollection(config.outDir, coll, template, 3).catch((err) => {
  throw err
})
