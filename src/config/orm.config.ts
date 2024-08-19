import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

type ConfigType = TypeOrmModuleOptions & PostgresConnectionOptions
type ConnectionOptions = ConfigType;

export const ORMConfig = async (
    configService: ConfigService
): Promise<ConnectionOptions> => ({
    type: 'postgres',
    host: /*'localhost'*/configService.get('DATABASE_HOST'),
    port: /*5434*/configService.get('DATABASE_PORT'),
    username: /*'admin'*/configService.get('DATABASE_USERNAME'),
    password: /*'admin'*/configService.get('DATABASE_PWD'),
    database: /*'e-klubi'*/configService.get('DATABASE_NAME'),
    entities: [__dirname + '/*/.entity{.js,.ts}'],
    synchronize: true,
    autoLoadEntities: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnathorized: false,
        },
    },
})