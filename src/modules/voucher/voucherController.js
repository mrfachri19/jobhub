/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const voucherModel = require("./voucherModel");

module.exports = {
  getAllvoucher: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "created_at ASC";
      let offset = page * limit - limit;

      const totalData = await voucherModel.getCountVoucher(search);
      const totalPage = Math.ceil(totalData / limit);
      if (totalPage < page) {
        offset = 0;
        page = 1;
      }
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await voucherModel.getAllVoucher(
        limit,
        offset,
        search,
        sort
      );

      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Data not found!`, []);
      }
      return helperWrapper.response(
        res,
        200,
        "Success get data",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },

  getvoucherById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await voucherModel.getVoucherById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(
        res,
        200,
        "succes get data by id merchant",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  postvoucher: async (req, res) => {
    try {
      const { price_id, name, harga } = req.body;

      if (!name || !harga) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (name and harga are required)",
          null
        );
      }

      const data = {
        price_id,
        name,
        harga,
      };

      const result = await voucherModel.postVoucher(data);

      return helperWrapper.response(res, 200, "Success post data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  updatevoucher: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, subtitle, description } = req.body;

      if (!title || !description) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (title and description are required)",
          null
        );
      }

      const data = {
        title,
        subtitle,
        description,
        image: req.file ? req.file.filename : null,
        created_at: new Date(),
      };
      Object.keys(data).forEach((data) => {
        if (!data[data]) {
          delete data[data];
        }
      });
      const result = await voucherModel.updateVoucher(id, data);

      return helperWrapper.response(res, 200, "Success update data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  deletevoucher: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await voucherModel.deleteVoucher(id);

      return helperWrapper.response(res, 200, "Success delete data", result);
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
