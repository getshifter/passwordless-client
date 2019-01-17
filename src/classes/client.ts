import * as request from 'superagent';
const client = {
  get (url: string) {
    return new Promise((resolve, reject) => {
      request.get(url).end((err, response) => {
        if (err) {
          reject(err);
        } else if (response.status > 299) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  },
  post (url: string, body = {}) {
    return new Promise((resolve, reject) => {
      request.post(url).end((err: Error, response) => {
        if (err) {
          reject(err);
        } else if (response.status > 299) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  }
}
export default client