import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsImagesService {
    findAll() {
        return `This action returns all newsImages`;
    }

    findOne(id: number) {
        return `This action returns a #${id} newsImage`;
    }

    remove(id: number) {
        return `This action removes a #${id} newsImage`;
    }
}
