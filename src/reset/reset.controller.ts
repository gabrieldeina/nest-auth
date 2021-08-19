import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Body,
  Controller,
  forwardRef,
  Inject,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ResetService } from './reset.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class ResetController {
  constructor(
    private resetService: ResetService,
    private mailService: MailerService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}
  @Post('forgot')
  async forgot(@Body('email') email: string) {
    const token = Math.random().toString(20).substr(2, 12);

    await this.resetService.create({
      email,
      token,
    });

    const url = `http://localhost:4200/reset/${token}`; // It should be changed based on the frontend

    await this.mailService.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `Click <a href="${url}">here</a> to reset your password!`,
    });

    return {
      message: 'Check your e-mail',
    };
  }

  @Post('reset')
  async reset(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Password do not match!');
    }

    const reset = await this.resetService.findOne({ token });

    const email = reset.email;

    const user = await this.authService.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.authService.update(user.id, {
      password: await bcrypt.hash(password, 12),
    });
  }
}
