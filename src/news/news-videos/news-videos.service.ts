import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsVideosService {
    findAll() {
        return `This action returns all newsVideos`;
    }

    findOne(id: number) {
        return `This action returns a #${id} newsVideo`;
    }

    remove(id: number) {
        return `This action removes a #${id} newsVideo`;
    }
}
