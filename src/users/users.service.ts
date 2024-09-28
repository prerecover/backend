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
import { AvatarUpload } from './dto/avatar-upload';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(Appointment)
        private readonly appointmentsRepository: Repository<Appointment>,
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

    async changeMe(userId: string, changeMe: UpdateUserInput) {
        const user = await this.findOne(userId);
        const { avatar, countryTitle, ...data } = changeMe;
        if (countryTitle) {
            const country = await this.countryRepository.findOneBy({ title: countryTitle });
            user.country = country;
        }
        if (avatar) {
            const path = await this.minioService.uploadFile(await avatar, 'users_images');
            user.avatar = `${this.minioService.pathToFile}/${path}`;
        }
        const newUser = await this.userRepository.save({
            ...user,
            ...data,
        });
        return newUser;
    }
    async findAll(args?: PaginateArgs): Promise<User[]> {
        return await this.userRepository.find({ relations: { country: true }, take: args.take, skip: args.skip });
    }
    async uploadAvatar(avatar: AvatarUpload, userId: string): Promise<string> {
        const user = await this.findOne(userId);
        const path = await this.minioService.uploadFile(await avatar.avatar, 'users_images');
        user.avatar = `${this.minioService.pathToFile}/${path}`;
        await this.userRepository.save(user);
        return user.avatar;
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            where: { _id: id },
            relations: { country: true, appointments: true },
        });
        if (!user) throw new NotFoundException('User with that id not found!');
        return user;
    }

    async appointmentsForUser(userId: string) {
        return await this.appointmentsRepository.find({
            where: { user: { _id: userId } },
            relations: { user: true, clinic: true, doctor: true, service: true },
        });
    }

    async findOneByNumber(number: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ number: number });
        if (!user) throw new NotFoundException('User with that number not found!');
        return user;
    }
    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: email });
        if (!user) throw new NotFoundException('User with that email not found!');
        return user;
    }

    @Transactional()
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
