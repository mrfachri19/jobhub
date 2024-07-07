/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const feedbackModel = require("./feedbackModel");

module.exports = {
  getAllFeedback: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "created_at ASC";
      let offset = page * limit - limit;

      const totalData = await feedbackModel.getCountFeedback(search);
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

      const result = await feedbackModel.getAllFeedback(
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

  getFeedbackById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await feedbackModel.getRekapJurnalById(id);
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
  postFeedback: async (req, res) => {
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

      const result = await feedbackModel.postFeedback(data);

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
  updateFeedback: async (req, res) => {
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
        // updated_at: new Date(),
      };
      Object.keys(data).forEach((data) => {
        if (!data[data]) {
          delete data[data];
        }
      });
      const result = await feedbackModel.updateFeedback(id, data);

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
  deleteFeedback: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await feedbackModel.deleteRekapJurnal(id);

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
