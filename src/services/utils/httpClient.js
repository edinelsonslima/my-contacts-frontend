import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

const NO_CONTENT_STATUS = 204;

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

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
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

    await delay(500);

    if (contentType && !contentType?.includes('application/json')) {
      throw new APIError(response);
    }

    if (response.status === NO_CONTENT_STATUS) return null;

    const responseBody = await response.json();

    if (!response.ok) throw new APIError(response, responseBody);

    return responseBody;
  }
}

export default HttpClient;
