import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config.service';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserPasswordDto } from './dto/update-password-user';
import { cpuUsage } from 'node:process';

@Injectable()
export class UsersService {
    private salt = 10;
    
    constructor(private configs: ConfigService) {}
      
    async findOne(username: string, password: string): Promise<Users> {
        const connection = await this.configs.getConnection('администратор');

        let res;
        try {
            const repositoryUsers = connection.getRepository(Users);
            res = await repositoryUsers.findOne({username: username});
            const isMatch = await bcrypt.compare(password, res.password);
            if (!isMatch) {
              res = null;
            }
        }
        finally {
            await connection.close();
        }

        return res;
    }
     
    async find(): Promise<Users[]> {
      const connection = await this.configs.getConnection('администратор');

      let res;
      try {
          const repositoryUsers = connection.getRepository(Users);
          res = await repositoryUsers.find();
      }
      finally {
          await connection.close();
      }

      return res;
   }

   async findOneByUsername(username: string): Promise<Users> {
    const connection = await this.configs.getConnection('администратор');

    let res;
    try {
        const repositoryUsers = connection.getRepository(Users);
        res = await repositoryUsers.findOne({username: username});
    }
    finally {
        await connection.close();
    }

    return res;
 }

    async create(newUser: CreateUserDto): Promise<Users> {
      const connection = await this.configs.getConnection('администратор');

      let res;
      try {
          const repositoryUsers = connection.getRepository(Users);
          const hash = await bcrypt.hash('Qwerty123', this.salt);
          const createUser = repositoryUsers.create({username: newUser.username, password: hash, role: newUser.role});
          res = await repositoryUsers.save(createUser);
      }
      finally {
          await connection.close();
      }

      return res;
    }

    async resetPassword(username: string): Promise<Users> {
      const connection = await this.configs.getConnection('администратор');

      let res;
      try {
          const repositoryUsers = connection.getRepository(Users);
          let findUser = await repositoryUsers.findOne({username: username});
          const hash = await bcrypt.hash('Qwerty123', this.salt);
          findUser.password = hash;
          res = await repositoryUsers.save(findUser);
      }
      finally {
          await connection.close();
      }
      
      return res;
    }

    async remove(username: string): Promise<Users> {
      const connection = await this.configs.getConnection('администратор');

      let res;
      try {
          const repositoryUsers = connection.getRepository(Users);
          let findUser = await repositoryUsers.findOne({username: username});
          res = await repositoryUsers.remove(findUser);
          findUser = await repositoryUsers.findOne({username: username});
          if (findUser) {
            throw new HttpException('Нельзя удалить последнего администратора!', HttpStatus.FORBIDDEN);
          }
      }
      finally {
          await connection.close();
      }
      
      return res;
    }

    async updatePassword(user: UpdateUserPasswordDto): Promise<Users> {
      const connection = await this.configs.getConnection('администратор');
      let res;
      try {
          const repositoryUsers = connection.getRepository(Users);
          let findUser = await repositoryUsers.findOne({username: user.username});
          const isMatch = await bcrypt.compare(user.password, findUser.password.toString());
          if (!isMatch) {
            throw new HttpException('Введен неверный пароль', HttpStatus.FORBIDDEN);
          }
          let hash = await bcrypt.hash(user.newPassword, this.salt);
          findUser.password = hash;
          res = await repositoryUsers.save(findUser);
      }
      finally {
          await connection.close();
      }
      
      return res;
    }

    async setRole(user: any): Promise<Users> {
      const connection = await this.configs.getConnection('администратор');

      let res;
      try {
          const repositoryUsers = connection.getRepository(Users);
          let findUser = await repositoryUsers.findOne({username: user.username});
          findUser.role = user.role;
          res = await repositoryUsers.save(findUser);
          findUser = await repositoryUsers.findOne({username: user.username});
          if (findUser.role != user.role) {
            throw new HttpException('Нельзя изменить роль последнего администратора!', HttpStatus.FORBIDDEN);
          }
      }
      finally {
          await connection.close();
      }
      
      return res;
    }
}
