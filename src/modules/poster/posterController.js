/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const PosterModel = require("./posterModel");

module.exports = {
  getAllPoster: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "created_at ASC";
      let offset = page * limit - limit;
      const totalData = await PosterModel.getCountPosters(search);
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

      const result = await PosterModel.getAllPosters(
        limit,
        offset,
        search,
        sort
      );

      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Data not found !`, []);
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
  getPosterById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await PosterModel.getPostersById(id);
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
  postPoster: async (req, res) => {
    try {
      const { user_id, nama_bisnis, lokasi, jenis_bisnis } = req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      const setData = {
        user_id,
        nama_bisnis,
        lokasi,
        jenis_bisnis,
        image: JSON.stringify(images),
        created_at: new Date(),
      };
      const result = await PosterModel.postPosters(setData);
      return helperWrapper.response(res, 200, "Succes create data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },

  deletePoster: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await PosterModel.deletePosters(id);

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
