const connection = require("../../config/mysql");

module.exports = {
  getAllSport: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM sports WHERE name LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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
  getSportById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM sports WHERE id = ?",
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
  getCountSport: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM sports WHERE name LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  postSport: (data) =>
    new Promise((resolve, reject) => {
      const query = `INSERT INTO sports SET ?`;
      connection.query(query, data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
  updateSport: (id, data) =>
    new Promise((resolve, reject) => {
      const query = `UPDATE sports SET ? WHERE id = ?`;
      connection.query(query, [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),

  deleteSport: (id) =>
    new Promise((resolve, reject) => {
      const query = `DELETE FROM sports WHERE id = ?`;
      connection.query(query, id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
};
