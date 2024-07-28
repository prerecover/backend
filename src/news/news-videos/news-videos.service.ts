import { Injectable } from '@nestjs/common';
import { CreateNewsVideoInput } from './dto/create-news-video.input';
import { UpdateNewsVideoInput } from './dto/update-news-video.input';

@Injectable()
export class NewsVideosService {
    create(createNewsVideoInput: CreateNewsVideoInput) {
        return 'This action adds a new newsVideo';
    }

    findAll() {
        return `This action returns all newsVideos`;
    }

    findOne(id: number) {
        return `This action returns a #${id} newsVideo`;
    }

    update(id: number, updateNewsVideoInput: UpdateNewsVideoInput) {
        return `This action updates a #${id} newsVideo`;
    }

    remove(id: number) {
        return `This action removes a #${id} newsVideo`;
    }
}
