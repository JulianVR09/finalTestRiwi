import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericService } from '../common/services/generic.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from '../common/services/password.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {
    super(userRepository)
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await this.passwordService.hashPassword(createUserDto.password);
    const newUser = { ...createUserDto, password: hashPassword};
    return this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    return super.findById(id)
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return super.update(id, updateUserDto)
  }

  async deleteUser(id: string): Promise<User> {
    return super.delete(id)
  }

  async findUserWithPassword(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role']
    });
  }
}
