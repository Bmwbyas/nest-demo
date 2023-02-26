import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";





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
      models: [User,Role,UserRoles,Post],
      autoLoadModels:true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
