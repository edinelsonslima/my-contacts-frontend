import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
      throw new APIError(response);
    }

    const body = await response.json();

    if (!response.ok) throw new APIError(response, body);

    await delay();

    return body;
  }
}

export default HttpClient;
