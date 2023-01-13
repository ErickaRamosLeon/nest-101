import { HttpService } from '@nestjs/axios';
import { Injectable } from "@nestjs/common";
import { SchemaRegistryService } from "./schema-registry.interface";

import { AxiosError } from 'axios';

const APICURIO_URL = 'http://localhost:8080'

@Injectable()
export class ApicurioSchemaRegistryService implements SchemaRegistryService {

    constructor( private readonly http: HttpService ) { }
    
    createSchema(schemaName: string, schemaDefinition: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getSchema(schemaName: string): Promise<object> {
        try {
            console.log('entra a get schema')
            const { data } = await this.http.axiosRef.get(`/api/artifacts/${schemaName}`, {
              baseURL: APICURIO_URL,
            })      
            return data
        } catch (error) {
            console.error(error)            
            throw error
        }
    }
}
      

    