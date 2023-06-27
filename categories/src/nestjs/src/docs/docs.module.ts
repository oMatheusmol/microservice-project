import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';

@Module({
  controllers: [DocsController],
  providers: null,
})
export class DocsModule {}
