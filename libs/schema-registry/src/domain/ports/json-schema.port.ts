export interface JsonSchemaPort {
    validate(schema: object, data: unknown): boolean;
  }
  
  export const JSON_SCHEMA_PORT = 'JsonSchemaPort';