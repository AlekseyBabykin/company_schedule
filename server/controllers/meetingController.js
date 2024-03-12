const { Meetings } = require("../models/models");
const ApiError = require("../error/ApiError");

class MeetingsController {
  async create(req, res, next) {
    try {
      const {
        CompanyBusinessId,
        details,
        date,
        location,
        business_name,
        summary,
      } = req.body;

      const meeting = await Meetings.create({
        CompanyBusinessId,
        details,
        date,
        location,
        business_name,
        summary,
      });
      return res.json({
        message: "The meeting was saved successfully",
        meeting,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        CompanyBusinessId,
        details,
        date,
        location,
        business_name,
        summary,
      } = req.body;

      const meeting = await Meetings.findOne({ where: { id } });
      if (!meeting) {
        next(ApiError.badRequest("The meeting was not found"));
      }
      meeting.CompanyBusinessId = CompanyBusinessId;
      meeting.details = details;
      meeting.date = date;
      meeting.location = location;
      meeting.business_name = business_name;
      meeting.summary = summary;
      await meeting.save();
      return res.json({
        message: "The meeeting successfully updated",
        meeting,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const meeeting = await Meetings.findOne({ where: { id } });
      if (!meeeting) {
        next(ApiError.badRequest("The meeting was not found"));
      }
      await meeeting.destroy();
      return res.json({
        message: "The meeting was successfully deleted",
        company,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async infoAllMeetings(req, res, next) {
    try {
      const { CompanyBusinessId } = req.body;
      const meeetings = await Meetings.findAll({
        where: { CompanyBusinessId },
      });
      return res.json({ meeetings });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async infoMeeting(req, res, next) {
    try {
      const { id } = req.params;
      const meeting = await Meetings.findOne({ where: { id } });
      if (!meeting) {
        next(ApiError.badRequest("The meeting was not found"));
      }
      return res.json({ meeting });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new MeetingsController();
