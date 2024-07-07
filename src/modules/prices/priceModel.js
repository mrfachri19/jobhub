const connection = require("../../config/mysql");

module.exports = {
  getAllprices: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM prices WHERE title LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),

  getPriceById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM prices WHERE id = ?";
      connection.query(query, [id], (err, result) => {
        if (err) {
          return reject(new Error(`SQL: ${err.message}`));
        }
        resolve(result);
      });
    });
  },

  getCountprices: (search) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT COUNT(*) AS total FROM prices WHERE title LIKE ?";
      connection.query(query, [`%${search}%`], (err, result) => {
        if (err) {
          return reject(new Error(`SQL: ${err.message}`));
        }
        resolve(result[0].total);
      });
    });
  },

  postprices: (data) =>
    new Promise((resolve, reject) => {
      const query = `INSERT INTO prices SET ?`;
      connection.query(query, data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),

  updateprices: (id, data) =>
    new Promise((resolve, reject) => {
      const query = `UPDATE prices SET ? WHERE id = ?`;
      connection.query(query, [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
  deletePrice: (id) =>
    new Promise((resolve, reject) => {
      const query = `DELETE FROM prices WHERE id = ?`;
      connection.query(query, id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
};
