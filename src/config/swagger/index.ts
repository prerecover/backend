import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication) => {
    const cfg = new DocumentBuilder()
        .setTitle('backend')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', in: 'header' }, 'Bearer')
        .build();
    const document = SwaggerModule.createDocument(app, cfg);
    SwaggerModule.setup('api', app, document);
};
