class DbClient {
  constructor(client) {
    this.client = client;
  }

  getTodoDetails() {
    return new Promise((res, rej) => {
      this.client.get('todoDetails', (err, result) => {
        if (err) rej(err);
        res(JSON.parse(result));
      });
    });
  }

  setTodoDetails(todoDetails) {
    return new Promise((res, rej) => {
      this.client.set(
        'todoDetails',
        JSON.stringify(todoDetails),
        (err, response) => {
          if (err) rej(err);
          res(response);
        }
      );
    });
  }
}

module.exports = { DbClient };
