import { RequestHandler } from "express";

export default class HomeController {
  public homeRoute: RequestHandler = async (req, res, next) => {
    res.send("Home Route");
  }
}
