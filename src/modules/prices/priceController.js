const helperWrapper = require("../../helper/wrapper");
const PriceModel = require("../prices/priceModel");

module.exports = {
  getAllPrices: async (req, res) => {
    try {
      let {
        page = 1,
        limit = 10,
        search = "",
        sort = "created_at ASC",
      } = req.query;
      page = Number(page);
      limit = Number(limit);
      const offset = (page - 1) * limit;

      const totalData = await PriceModel.getCountprices(search);
      const totalPage = Math.ceil(totalData / limit);

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await PriceModel.getAllprices(limit, offset, search, sort);

      if (result.length < 1) {
        return helperWrapper.response(res, 200, "Data not found!", []);
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

  getPriceById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await PriceModel.getPriceById(id);

      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found!`,
          null
        );
      }

      return helperWrapper.response(res, 200, "Success get data by id", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },

  postPrices: async (req, res) => {
    try {
      const { nama, harga, benefit, bonus } = req.body;

      if (!nama || !harga) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (nama and harga are required)",
          null
        );
      }

      const data = {
        nama,
        harga,
        benefit,
        bonus,
      };

      const result = await PriceModel.postprices(data);

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

  updatePrices: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, image } = req.body;

      if (!title || !author) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (user_id and notes are required)",
          null
        );
      }

      const data = {
        title,
        author,
        image: req.file ? req.file.filename : null,
        created_at: new Date(),
      };

      // untuk mengupdate salah satu field saja
      Object.keys(data).forEach((data) => {
        if (!data[data]) {
          delete data[data];
        }
      });

      const result = await PriceModel.updateprices(id, data);

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
  deletePrice: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await PriceModel.deletePrice(id);

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
