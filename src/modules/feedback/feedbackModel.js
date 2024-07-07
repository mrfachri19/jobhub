const connection = require("../../config/mysql");

module.exports = {
  getAllFeedback: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM feedbacks WHERE name LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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
  getFeedbackById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM feedbacks WHERE id = ?",
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
  getCountFeedback: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM feedbacks WHERE name LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  postFeedback: (data) =>
    new Promise((resolve, reject) => {
      const query = `INSERT INTO feedbacks SET ?`;
      connection.query(query, data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
  updateFeedback: (id, data) =>
    new Promise((resolve, reject) => {
      const query = `UPDATE feedbacks SET ? WHERE id = ?`;
      connection.query(query, [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),

  deleteRekapJurnal: (id) =>
    new Promise((resolve, reject) => {
      const query = `DELETE FROM feedbacks WHERE id = ?`;
      connection.query(query, id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
};
