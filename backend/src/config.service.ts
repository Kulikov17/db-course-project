import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from "typeorm";
import * as path from 'path';

@Injectable()
export class ConfigService {
  async getConnection(role: string): Promise<Connection> | null {
    if (role == 'администратор') {
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
    } else if (role == 'сотрудник') {
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
    } else if (role == 'читатель') {
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
