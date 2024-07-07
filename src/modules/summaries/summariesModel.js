const connection = require("../../config/mysql");

module.exports = {
  getAllSumarry: (limit, offset, search, sort, book_id) =>
    new Promise((resolve, reject) => {
      let query = `SELECT * FROM summaries WHERE book_id = ?`;
      let params = [book_id, limit, offset];

      if (search) {
        query += ` AND content LIKE ?`;
        params.push(`%${search}%`);
      }

      query += ` ORDER BY ${sort} LIMIT ? OFFSET ?`;

      connection.query(query, params, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),

  getSummaryById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM summaries WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),
  getCountSumarry: (search, book_id) =>
    new Promise((resolve, reject) => {
      let query = `SELECT COUNT(*) AS total FROM summaries WHERE book_id = ?`;
      let params = [book_id];

      if (search) {
        query += ` AND content LIKE ?`;
        params.push(`%${search}%`);
      }

      connection.query(query, params, (err, result) => {
        if (!err) {
          resolve(result[0].total);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
    postSumarry: (data) =>
      new Promise((resolve, reject) => {
        const query = connection.query(
          "INSERT INTO summaries SET ?",
          data,
          (error, result) => {
            if (!error) {
              const newResult = {
                id: result.insertId,
                ...data,
              };
              resolve(newResult);
            } else {
              reject(new Error(`SQL : ${error.message}`));
            }
          }
        );
        // eslint-disable-next-line no-console
        console.log(query.sql);
      }),
};
