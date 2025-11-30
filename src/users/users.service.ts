import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-role-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto){
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: string){
    const user = await this.userRepository.findOneBy({id});

    if(!user) throw new NotFoundException(`User with ID ${id}, not found`);

    return user;
  }

  async findByEmail(email: string){
    const user = await this.userRepository.findOneBy({email});
    return user;
  }

  async existsByEmail(email: string){
    return this.userRepository.existsBy({email});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, ...restOfUpdates } = updateUserDto;

    if (email) {
      const existingUser = await this.userRepository.findOne({
        where: { email },
        select: ['id'],
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use by another account.');
      }
    }
    const user = await this.userRepository.preload({
      id,
      email,
      ...restOfUpdates,
    });

    if(!user) throw new NotFoundException(`User with ID ${id}, not found`);

    return this.userRepository.save(user);
  }

  async updateRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    await this.userRepository.update(id, { role: updateUserRoleDto.role });
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    if(result.affected === 0) throw new NotFoundException(`User with ID ${id}, not found`);

    return {message: 'User deleted'};
  }
}