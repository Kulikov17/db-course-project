import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from "typeorm";
import * as path from 'path';

@Injectable()
export class ConfigService {
  async getConnection(role: string): Promise<Connection> | null {
    if (role == 'admin') {
      return await createConnection({
        name: 'admin',
        type: 'postgres',
        port: 5432,
        host: '127.0.0.1',
        database: 'DTP',
        username: "postgres",
        password: 'Dimakrut17',
        entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
        synchronize: true
      });
    } else if (role == 'editor') {
      return await createConnection({
        name: 'admin',
        type: 'postgres',
        port: 5432,
        host: '127.0.0.1',
        database: 'DTP',
        username: "editor",
        password: 'editor',
        entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
        synchronize: true
      });
    } else {
      return await createConnection({
        name: 'admin',
        type: 'postgres',
        port: 5432,
        host: '127.0.0.1',
        database: 'DTP',
        username: "reader",
        password: 'reader',
        entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
        synchronize: true
      });
    }
  }
}
