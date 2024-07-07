/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const meditationModel = require("./meditationModel");

module.exports = {
  getAllMeditation: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "created_at ASC";
      let offset = page * limit - limit;

      const totalData = await meditationModel.getCountMeditation(search);
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

      const result = await meditationModel.getAllMeditation(
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

  getMeditationById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await meditationModel.getMeditationById(id);
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
  postMeditation: async (req, res) => {
    try {
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

      const result = await meditationModel.postMeditation(data);

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
  updatemeditation: async (req, res) => {
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
      const result = await meditationModel.updatemeditation(id, data);

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
  deleteMeditation: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await meditationModel.deleteMeditation(id);

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
