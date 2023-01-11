export interface SchemaRegistryPort {
    createSchema(schemaName: string, schemaDefinition: string): Promise<void>;
    getSchema(schemaName: string): Promise<object>;
  }
  
  export const SCHEMA_REGISTRY_PORT = Symbol('SchemaRegistryPort');
  