import fs from "fs/promises";
import { XMLParser, X2jOptions } from "fast-xml-parser";
import { DataFile } from "../api/DataFile";

export const parseDat = async (path: string) => {
    const fileData = await fs.readFile(path, { encoding: "utf8" });
    const parserOptions: Partial<X2jOptions> = {
        processEntities: false,
        ignoreDeclaration: true,
        ignoreAttributes: false,
        attributeNamePrefix: ""
    };
    const datData = new XMLParser(parserOptions).parse(fileData);
    const dat = new DataFile(datData.datafile);
    return dat;
};
