import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedResolver } from './saved.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { News } from 'src/news/entities/news.entity';
import { UsersModule } from 'src/users/users.module';
import { Saved } from './entities/saved.entity';

@Module({
    imports: [TypeOrmModule.forFeature([News, User, Saved]), UsersModule],
    providers: [SavedResolver, SavedService],
    exports: [SavedService],
})
export class SavedModule {}
