import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinksService {
    constructor(
        @InjectRepository(Link)
        public readonly linkRepository: Repository<Link>,
    ) {}

    async generateLink(clinicEmail?: string) {
        const link = this.linkRepository.create({ clinicEmail: clinicEmail });
        return await this.linkRepository.save(link);
    }
    async validateLink(linkId: string) {
        const ONE_HOUR = 60 * 60 * 1000;
        const link = await this.linkRepository.findOneBy({ _id: linkId });

        if (!link) {
            throw new BadRequestException('No valid link!');
        }
        if (link.isUsed) {
            throw new BadRequestException('Link has already been used');
        }
        if (Date.now() - link.expiredAt.getTime() > ONE_HOUR) {
            throw new BadRequestException('Link time expired!');
        }
        link.isUsed = true;
        return await this.linkRepository.save(link);
    }
}
