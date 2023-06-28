import { Client } from '@elastic/elasticsearch';

export class ElasticSearch {
  client: Client;
  index: string;

  constructor(service: string, port: number) {
    this.client = new Client({ node: `http://${service}:${port}` });
    this.index = 'logs-categories';
  }
}
