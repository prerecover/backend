import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        @InjectRepository(Favorite)
        private readonly favoriteRepository: Repository<Favorite>,
    ) {}
    async create(userId: string, bookId: string) {
        const user = await this.userRepository.findOneBy({ _id: userId });
        const book = await this.bookRepository.findOneBy({ _id: bookId });
        const favorite = this.favoriteRepository.create({ user: user, book: book });
        return await this.favoriteRepository.save(favorite);
    }

    async findAll(args: PaginateArgs) {
        return await this.favoriteRepository.find({
            relations: { user: true, book: true },
            skip: args.skip,
            take: args.take,
        });
    }

    async findByUserId(userId: string) {
        const user = await this.userRepository.findOneBy({ _id: userId });
        return await this.favoriteRepository.find({ relations: { user: true, book: true }, where: { user: user } });
    }
    async findOne(id: string) {
        const favorite = await this.favoriteRepository.findOne({
            where: { _id: id },
            relations: { book: true, user: true },
        });
        if (!favorite) throw new NotFoundException('Favorite not found!');
        return favorite;
    }

    async remove(id: string) {
        const favorite = await this.findOne(id);
        await this.favoriteRepository.delete({ _id: id });
        return favorite;
    }
}
