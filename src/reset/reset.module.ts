import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reset } from './reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reset]),
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
      },
      defaults: {
        from: 'no-reply@localhost.com',
      },
    }),
    AuthModule,
  ],
  providers: [ResetService],
  controllers: [ResetController],
})
export class ResetModule {}
