import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { Favorite } from './entities/favorite.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Book, Favorite])],
    providers: [FavoritesResolver, FavoritesService],
})
export class FavoritesModule {}
