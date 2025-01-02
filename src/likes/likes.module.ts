import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/news/entities/news.entity';
import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Like, News, User]), forwardRef(() => UsersModule)],
    providers: [LikesResolver, LikesService],
    exports: [LikesService],
})
export class LikesModule { }
