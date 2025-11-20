import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto
    });

    if(!user) throw new NotFoundException(`User with ID ${id}, not found`);

    return this.userRepository.save(user);
  }

  async updateRole(id: string, newRole: UserRole) {
    const { role, ...userData } = await this.findOneById(id);

    const userRoleUpdate = this.userRepository.create({
      role: newRole,
      ...userData
    });

    return this.userRepository.save(userRoleUpdate);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    if(result.affected === 0) throw new NotFoundException(`User with ID ${id}, not found`);

    return {message: 'User deleted'};
  }
}