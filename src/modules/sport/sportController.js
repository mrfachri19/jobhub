/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const sportModel = require("./sportModel");

module.exports = {
  getAllsport: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "created_at ASC";
      let offset = page * limit - limit;

      const totalData = await sportModel.getCountSport(search);
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

      const result = await sportModel.getAllSport(limit, offset, search, sort);

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

  getsportById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sportModel.getSportById(id);
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
  postsport: async (req, res) => {
    try {
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

      const result = await sportModel.postSport(data);

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
  updatesport: async (req, res) => {
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
      const result = await sportModel.updateSport(id, data);

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
  deletesport: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await sportModel.deleteSport(id);

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
