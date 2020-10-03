class DbClient {
  constructor(client) {
    this.client = client;
  }

  getTodoDetails() {
    return new Promise((resolve, reject) => {
      this.client.get('todoDetails', (err, result) => {
        if (err) reject(err);
        resolve(JSON.parse(result));
      });
    });
  }

  setTodoDetails(todoDetails) {
    return new Promise((resolve, reject) => {
      this.client.set(
        'todoDetails',
        JSON.stringify(todoDetails),
        (err, response) => {
          if (err) reject(err);
          resolve(response);
        }
      );
    });
  }
}

module.exports = { DbClient };
