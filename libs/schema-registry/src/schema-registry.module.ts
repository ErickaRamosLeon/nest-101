import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { AjvJsonSchemaService } from './ajv-json-schema.service';
import { ApicurioSchemaRegistryService } from './apicurio-schema-registry.service';
import { ISCHEMA_REGISTRY } from './schema-registry.interface';


@Module({
  imports: [HttpModule],
  providers: [ 
    { provide: ISCHEMA_REGISTRY, useClass: ApicurioSchemaRegistryService },
    { provide: 'JsonSchemaService', useClass: AjvJsonSchemaService },
  ],
  exports: [
    { provide: ISCHEMA_REGISTRY, useClass: ApicurioSchemaRegistryService },
    { provide: 'JsonSchemaService', useClass: AjvJsonSchemaService },
  ],
})
export class SchemaRegistryModule {}

  



