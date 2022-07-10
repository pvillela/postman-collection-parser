import { config } from "./config";
import { parseCollection } from "../lib/parse-collection";
import { template } from "./template";
import { CollectionDefinition } from "postman-collection";

const coll: CollectionDefinition = require("../../postman-collections/IIAB.postman_collection.json")

parseCollection(config.outDir, coll, template).catch((err) => console.log(err))
