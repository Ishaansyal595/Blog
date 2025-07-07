import express from "express"
import { SendMail } from "../controller/SendMail.controller.js";

const MailRouter = express.Router() 

MailRouter.post("/send-request", SendMail);

export default MailRouter