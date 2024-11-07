import { MongooseModuleOptions } from '@nestjs/mongoose';

export default (): { mongoConfig: MongooseModuleOptions } => {
  return {
    mongoConfig: {
      uri: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
      autoIndex: true,
      autoCreate: true,
      retryDelay: 2000,
      retryAttempts: 3,
    },
  };
};
