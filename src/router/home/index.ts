import { Router } from "express";
import Controller from "./controller";

const homeContoller = new Controller();

class Home {
  public router: Router = Router();
  constructor() {
    this.router.get("/", homeContoller.homeRoute);
  }
}

const homeHandler = new Home();
export default homeHandler.router;
