export interface JsonSchemaService {
    validate(schema: object, data: unknown): boolean
  }

export const IJSON_SCHEMA = 'JsonSchemaService';