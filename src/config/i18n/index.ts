import { I18nOptionsFactory, I18nOptionsWithoutResolvers } from 'nestjs-i18n';
import { join } from 'path';

export class I18NConfig implements I18nOptionsFactory {
    async createI18nOptions(): Promise<I18nOptionsWithoutResolvers> {
        return {
            fallbackLanguage: 'ru',
            loaderOptions: {
                path: join(__dirname, '/i18n/'),
                watch: true,
            },
        };
    }
}
