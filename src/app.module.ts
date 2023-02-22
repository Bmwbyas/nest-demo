import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';





@Module({
  imports: [ProductsModule,
    MongooseModule.forRoot('mongodb+srv://askerko50:64vzJmdTGUSyVKiL@cluster0.byzwxqv.mongodb.net/?retryWrites=true&w=majority'),
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule .forRoot({
      dialect: 'postgres',
      host: process.env.POST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels:true
    }),
    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
