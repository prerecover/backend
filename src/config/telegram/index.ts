import { Injectable } from '@nestjs/common';
import { TelegramModuleOptions, TelegramOptionsFactory } from 'nestjs-telegram';

@Injectable()
export class TelegramConfig implements TelegramOptionsFactory {
  createTelegramOptions(): Promise<TelegramModuleOptions> | TelegramModuleOptions {
    return {
      botKey: process.env.BOT_TOKEN,
    };
  }
}
