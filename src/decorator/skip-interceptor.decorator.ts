import { SetMetadata } from '@nestjs/common';

export const SKIP_INTERCEPTOR = 'SKIP_INTERCEPTOR';
export const SkipInterceptor = () => SetMetadata(SKIP_INTERCEPTOR, true);
