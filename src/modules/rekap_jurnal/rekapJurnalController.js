/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const rekapJurnalModel = require("./rekapJurnalModel");

module.exports = {
  getAllRekapJurnal: async (req, res) => {
    try {
      let { page, limit, search, sort, user_id } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "created_at ASC";
      let offset = page * limit - limit;

      if (!user_id) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (user_id is required)",
          null
        );
      }

      const totalData = await rekapJurnalModel.getCountRekapJurnal(
        search,
        user_id
      );
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

      const result = await rekapJurnalModel.getAllRekapJurnal(
        limit,
        offset,
        search,
        sort,
        user_id
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

  getRekapJurnalById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await rekapJurnalModel.getRekapJurnalById(id);
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
  postRekapJurnal: async (req, res) => {
    try {
      const { user_id, name, email, notes } = req.body;

      if (!user_id || !notes) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (user_id and notes are required)",
          null
        );
      }

      const data = {
        user_id,
        name,
        email,
        notes,
        created_at: new Date(),
      };

      const result = await rekapJurnalModel.postRekapJurnal(data);

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
  updateRekapJurnal: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, name, email, notes } = req.body;

      if (!user_id || !notes) {
        return helperWrapper.response(
          res,
          400,
          "Bad request (user_id and notes are required)",
          null
        );
      }

      const data = {
        user_id,
        name,
        email,
        notes,
        updated_at: new Date(),
      };
      Object.keys(data).forEach((data) => {
        if (!data[data]) {
          delete data[data];
        }
      });
      const result = await rekapJurnalModel.updateRekapJurnal(id, data);

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
  deleteRekapJurnal: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await rekapJurnalModel.deleteRekapJurnal(id);

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
