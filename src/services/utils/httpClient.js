import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      body: JSON.stringify(options.body),
      method: options.method,
      headers,
    });

    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
      throw new APIError(response);
    }

    const responseBody = await response.json();

    if (!response.ok) throw new APIError(response, responseBody);

    await delay(500);

    return responseBody;
  }
}

export default HttpClient;
