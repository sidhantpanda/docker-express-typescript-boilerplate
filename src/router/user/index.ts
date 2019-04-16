import { Router } from "express";
import Controller from "./controller";

const userContoller = new Controller();

class Home {
  public router: Router = Router();
  constructor() {
    this.router.get("/", userContoller.getUsers);
  }
}

const homeHandler = new Home();
export default homeHandler.router;
