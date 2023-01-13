import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import { Injectable } from "@nestjs/common";
import { JsonSchemaService } from "./json-schema.interface";

const ajv = new Ajv2020();
addFormats(ajv);

@Injectable()
export class AjvJsonSchemaService implements JsonSchemaService {
    //private readonly ajv = new Ajv();
    validate(schema: object, data: unknown): boolean {
        console.log('validateXXXX')
        const validate = ajv.compile(schema);      

        console.log('validateXXXX', validate)


        const valid = validate(data);
        console.log("valid", valid)
        if (!valid) {
            // Se devería devolver el listado de errores en lugar de un boolean
            console.error(validate.errors);
          }
        console.log("data", data)

        return valid;
    }  
}
