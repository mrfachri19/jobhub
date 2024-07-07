const connection = require("../../config/mysql");

module.exports = {
  getAllRekapOlahraga: (limit, offset, search, sort, user_id) =>
    new Promise((resolve, reject) => {
      let query = `SELECT * FROM rekap_olahraga WHERE user_id = ?`;
      let params = [user_id, limit, offset];

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
  getRekapOlahragaById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM rekap_olahraga WHERE id = ?",
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
  getCountRekapOlahraga: (search, user_id) =>
    new Promise((resolve, reject) => {
      let query = `SELECT COUNT(*) AS total FROM rekap_olahraga WHERE user_id = ?`;
      let params = [user_id];

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
  postRekapOlahraga: (data) =>
    new Promise((resolve, reject) => {
      const query = `INSERT INTO rekap_olahraga SET ?`;
      connection.query(query, data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
  updateRekapOlahraga: (id, data) =>
    new Promise((resolve, reject) => {
      const query = `UPDATE rekap_olahraga SET ? WHERE id = ?`;
      connection.query(query, [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),

  deleteRekapOlahraga: (id) =>
    new Promise((resolve, reject) => {
      const query = `DELETE FROM rekap_olahraga WHERE id = ?`;
      connection.query(query, id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${err.message}`));
        }
      });
    }),
};
