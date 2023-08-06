const express=require('express');
const router=new express.Router();

const EventController=require('../controllers/event.js');
router.post("/create",EventController.createEvent);
router.get("/getEvent",EventController.getEvent);
router.post("/join",EventController.joinEvent);


module.exports=router;
