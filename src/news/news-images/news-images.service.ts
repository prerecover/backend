import { Injectable } from '@nestjs/common';
import { CreateNewsImageInput } from './dto/create-news-image.input';
import { UpdateNewsImageInput } from './dto/update-news-image.input';

@Injectable()
export class NewsImagesService {
    create(createNewsImageInput: CreateNewsImageInput) {
        return 'This action adds a new newsImage';
    }

    findAll() {
        return `This action returns all newsImages`;
    }

    findOne(id: number) {
        return `This action returns a #${id} newsImage`;
    }

    update(id: number, updateNewsImageInput: UpdateNewsImageInput) {
        return `This action updates a #${id} newsImage`;
    }

    remove(id: number) {
        return `This action removes a #${id} newsImage`;
    }
}
