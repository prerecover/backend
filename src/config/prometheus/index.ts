import { Injectable } from '@nestjs/common';
import { PrometheusOptions, PrometheusOptionsFactory } from '@willsoto/nestjs-prometheus';

@Injectable()
export class PrometheusConfig implements PrometheusOptionsFactory {
    createPrometheusOptions():
        | Promise<PrometheusOptions<'text/plain; version=0.0.4; charset=utf-8'>>
        | PrometheusOptions<'text/plain; version=0.0.4; charset=utf-8'> {
        return {
            path: '/metrics',
        };
    }
}
