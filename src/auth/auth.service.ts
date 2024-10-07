import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/services/password.service';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) { }

  private generateToken(user: any): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async registerUser(registerDto: RegisterDto): Promise<RegisterDto> {
    return this.userService.createUser(registerDto)
  }

  async loginUser({ email, password }: LoginDto) {
    const findUser = await this.userService.findUserWithPassword(email)

    if (!findUser) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await this.passwordService.comparePasswords(password, findUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = this.generateToken(findUser);
    return {
      accessToken
    };
  }

  async findAllUsers(): Promise<User[]>{
    return this.userService.findAllUsers();
  }
}
