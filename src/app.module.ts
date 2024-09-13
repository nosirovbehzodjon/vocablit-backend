import { Module } from '@nestjs/common';
// import { AppController } from '@/src/app.controller';
// import { AppService } from '@/src/app.service';
// import { UsersController } from '@/src/modules/users/users.controller';
import { UsersModule } from '@/src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmAsyncConfig } from '@/src/db/database.config';
// import { UsersService } from '@/src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    UsersModule,
  ],
  // controllers: [AppController, UsersController],
  // providers: [AppService, UsersService],
})
export class AppModule {}
