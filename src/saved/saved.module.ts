import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedResolver } from './saved.resolver';

@Module({
  providers: [SavedResolver, SavedService],
})
export class SavedModule {}
