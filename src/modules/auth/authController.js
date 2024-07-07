const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel.js");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { nama, username, email, password, no_telp, alamat, jenis_iklan } =
        req.body;

      // PROSES PENGECEKAN EMAIL SUDAH PERNAH TERDAFTAR ATAU BLM DI DATABASE
      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 409, `Email already used`, null);
      }

      // Proses Validasi input form
      if (email.length < 1 || password.length < 1 || nama.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      // PROSES ENCRYPT PASSWORD
      const hashPassword = await bcryptjs.hash(password, 10);
      const setData = {
        jenis_iklan,
        nama,
        username,
        alamat,
        email,
        password,
        no_telp,
        role: "user",
        password: hashPassword,
      };

      const result = await authModel.register(setData);
      return helperWrapper.response(
        res,
        200,
        "Success register user, please verify your email",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request, ${error.message}`,
        null
      );
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { newPassword, confirmPassword } = req.body;

      const user = await authModel.getUserById(id);
      if (user.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Get data user by id ${id} not found`,
          null
        );
      }

      if (newPassword !== confirmPassword) {
        return helperWrapper.response(
          res,
          400,
          `Password does not match`,
          null
        );
      }

      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(newPassword, salt);

      const setData = { password: passwordHash };

      const result = await authModel.updatePass(setData, id);

      return helperWrapper.response(res, 200, `Success update password`, {
        id: result.id,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      console.log(checkUser[0]);

      // Proses Validasi input form
      if (email.length < 1 || username.length < 1 || password.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      const passwordUser = await bcryptjs.compare(
        password,
        checkUser[0] ? checkUser[0].password : checkPhone[0].password
      );
      if (!passwordUser) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }

      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkUser[0] ? checkUser[0] : checkPhone[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "24h",
      });
      // Add refresh token
      const refreshToken = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "72h",
      });
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
        name: payload.nama,
        idUse: payload.id,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
