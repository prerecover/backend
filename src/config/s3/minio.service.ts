import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { FileUpload } from 'src/common/shared/file.interface';
import { Stream } from 'stream';

@Injectable()
export class MinioService {
    bucket = process.env.MINIO_BUCKET;
    pathToFile = `${process.env.MINIO_URL}/${this.bucket}`;
    constructor(@InjectS3() private readonly S3Service: S3) {
        const buckets = this.S3Service.listBuckets().then((bucket) => bucket.Buckets.map((bucket) => bucket.Name));
        buckets.then(
            (buckets) => !buckets.includes(this.bucket) && this.S3Service.createBucket({ Bucket: this.bucket }),
        );
    }

    async streamToBuffer($stream: Stream): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const data = [];
            $stream.on('data', (chunk) => {
                data.push(chunk);
            });

            $stream.on('end', () => {
                resolve(Buffer.concat(data));
            });

            $stream.on('error', (err) => {
                reject(err);
            });
        });
    }

    public async uploadFile(file: FileUpload, pathPrefix: string) {
        const { filename, createReadStream } = file;
        const pathFile = `${pathPrefix}/${filename}`;
        await this.loadFile(pathFile, createReadStream());
        return pathFile;
    }
    private async loadFile(fileName: string, data: Stream) {
        const buffer = await this.streamToBuffer(data);
        this.S3Service.putObject({
            Bucket: this.bucket,
            Key: fileName,
            Body: buffer,
        });
    }
}
