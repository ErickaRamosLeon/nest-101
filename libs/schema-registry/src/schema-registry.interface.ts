export interface SchemaRegistryService {
  createSchema(schemaName: string, schemaDefinition: string): Promise<void>
  getSchema(schemaName: string): Promise<object>
}

export const ISCHEMA_REGISTRY = 'SchemaRegistryService';
