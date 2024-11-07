import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as process from 'node:process';
import mongoConfig from './config/mongo/mongo.config';
import { PostModule } from './modules/post/post.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/${
        !process.env.NODE_ENV
          ? '.env.production'
          : `.env.${process.env.NODE_ENV}`
      }`,
      load: [mongoConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get<MongooseModuleOptions>('mongoConfig'),
      inject: [ConfigService],
    }),
    PostModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
