import { config } from "./config";
import { parseCollection } from "@src/lib/parse-collection";
import { template } from "./template";
import { CollectionDefinition } from "postman-collection";

const coll: CollectionDefinition = require("../../postman-collections/Conduit.postman_collection.json")

parseCollection(config.outDir, coll, template, 3).catch((err) => console.log(err))
