import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
import { database } from '../config/env.config';

@Injectable()
export class PostgresService {    
    constructor( private readonly config: ConfigService ){}

    async query(sql: string, parameters: Array<any>): Promise<any>{
        let data = null;
        const client = new Client(this.config.get(database));
        try {
            await client.connect() ;
            console.log('sql', sql)
            console.log('parameters', parameters)
            data = await client.query(sql, parameters);            
        } finally {
            await client.end();
        }
        return data;
    }
}
