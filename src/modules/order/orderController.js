/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const orderModel = require("./orderModel");

module.exports = {
  getAllorder: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "created_at ASC";
      let offset = page * limit - limit;

      const totalData = await orderModel.getCountorder(search);
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

      const result = await orderModel.getAllorder(limit, offset, search, sort);

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

  getorderById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await orderModel.getorderById(id);
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
  postorder: async (req, res) => {
    try {
      const {
        user_id,
        price_id,
        ig_ads,
        wa_story,
        voucer_id,
        metode_pembayaran,
        total,
      } = req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      if (!metode_pembayaran) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (metode_pembayaran are required)",
          null
        );
      }

      const data = {
        user_id,
        price_id,
        ig_ads,
        wa_story,
        voucer_id,
        metode_pembayaran,
        total,
        image: JSON.stringify(images),
      };

      const result = await orderModel.postOrder(data);

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
  updateorder: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (!name || !description) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (user_id and notes are required)",
          null
        );
      }

      const data = {
        name,
        description,
        created_at: new Date(),
      };
      Object.keys(data).forEach((data) => {
        if (!data[data]) {
          delete data[data];
        }
      });
      const result = await orderModel.updateorder(id, data);

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
  deleteorder: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await orderModel.deleteorder(id);

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
