import { Injectable } from '@nestjs/common';
import { CreateSavedInput } from './dto/create-saved.input';
import { UpdateSavedInput } from './dto/update-saved.input';

@Injectable()
export class SavedService {
  create(createSavedInput: CreateSavedInput) {
    return 'This action adds a new saved';
  }

  findAll() {
    return `This action returns all saved`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saved`;
  }

  update(id: number, updateSavedInput: UpdateSavedInput) {
    return `This action updates a #${id} saved`;
  }

  remove(id: number) {
    return `This action removes a #${id} saved`;
  }
}
