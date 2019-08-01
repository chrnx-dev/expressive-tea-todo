import * as bodyParser from "body-parser";
import {Express} from "express";

export default function bodyParserConfiguration(app: Express): void {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}
