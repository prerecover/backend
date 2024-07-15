import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioService } from 'src/config/s3/minio.service';
import { UpdateUserInput } from './dto/update-user.input';
import { Transactional } from 'typeorm-transactional';
import { Country } from 'src/countries/entities/country.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @Inject()
        private readonly minioService: MinioService,
    ) {}

    @Transactional()
    async create(createUserInput: CreateUserInput, countryTitle: string): Promise<User> {
        const { avatar, ...data } = createUserInput;
        const user = this.userRepository.create(data);

        const country = await this.countryRepository.findOneBy({ title: countryTitle });
        if (avatar) {
            const path = await this.minioService.uploadFile(await avatar, 'users_images');
            user.avatar = `${this.minioService.pathToFile}/${path}`;
        }
        user.country = country;
        return await this.userRepository.save(user);
    }

    async findAll(args: PaginateArgs): Promise<User[]> {
        return await this.userRepository.find({ relations: { country: true }, take: args.take, skip: args.skip });
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({ where: { _id: id }, relations: { country: true } });
        if (!user) throw new NotFoundException('User not found!');
        return user;
    }

    async update(id: string, updateUserInput: UpdateUserInput, countryTitle: string) {
        const user = await this.findOne(id);
        const { avatar, ...data } = updateUserInput;
        const country = await this.countryRepository.findOneBy({ title: countryTitle });
        if (avatar) {
            const path = await this.minioService.uploadFile(await avatar, 'users_images');
            user.avatar = `${this.minioService.pathToFile}/${path}`;
        }
        user.country = country ? country : user.country;
        const newUser = await this.userRepository.save({
            ...user,
            ...data,
        });
        return newUser;
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        await this.userRepository.delete({ _id: id });
        return user;
    }
}
