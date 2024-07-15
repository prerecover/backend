import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/news/entities/news.entity';
import { Like } from './entities/like.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Like, News])],
    providers: [LikesResolver, LikesService],
})
export class LikesModule { }
