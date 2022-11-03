import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';
import { PORT } from 'src/main';

@Controller('docs')
export class DocsController {
  @Get('')
  docs() {
    const html = fs.readFileSync(`${__dirname}/../../html/docs.html`, {
      encoding: 'utf-8',
    });
    return html.replace('$URL', `http://localhost:${PORT}/api-json`);
  }
}
