import { ElasticSearch } from '../elasticsearch/elasticsearch';

class Logger {
  elasticsearch: ElasticSearch;
  constructor() {
    this.elasticsearch = new ElasticSearch('elasticsearch', 9200);
  }
  async info(message: string) {
    await this.elasticsearch.client.index({
      index: this.elasticsearch.index,
      body: {
        level: 'info',
        message: message,
        timestamp: new Date(),
      },
    });
  }

  async error(message: string) {
    await this.elasticsearch.client.index({
      index: this.elasticsearch.index,
      body: {
        level: 'error',
        message: message,
        timestamp: new Date(),
      },
    });
  }
}

export default new Logger();
