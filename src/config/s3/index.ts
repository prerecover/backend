import { Injectable } from '@nestjs/common';
import { S3ModuleOptions, S3ModuleOptionsFactory } from 'nestjs-s3';

@Injectable()
export class S3Config implements S3ModuleOptionsFactory {
    createS3ModuleOptions(): S3ModuleOptions {
        return {
            config: {
                credentials: {
                    accessKeyId: process.env.MINIO_ACCESS_KEY,
                    secretAccessKey: process.env.MINIO_SECRET_KEY,
                },
                endpoint: process.env.MINIO_URL,
                forcePathStyle: true,
                region: 'ru-1',
            },
        };
    }
}
