import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BullConfig implements SharedBullConfigurationFactory {
    createSharedConfiguration(): Promise<BullRootModuleOptions> | BullRootModuleOptions {
        return {
            redis: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
            },
        };
    }
}
