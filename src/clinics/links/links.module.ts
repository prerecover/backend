import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksResolver } from './links.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';

@Module({
    providers: [LinksResolver, LinksService],
    imports: [TypeOrmModule.forFeature([Link])],
})
export class LinksModule {}
