import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { useContainer } from 'class-validator';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
    initializeTransactionalContext();
    const app = await NestFactory.create(AppModule, {
        logger: ['debug'],
    });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.use('/graphql', graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }));
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.enableCors();

    SwaggerConfig(app);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
