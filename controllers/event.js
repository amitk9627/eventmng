const Event = require("../models/event.js");
const Attendee = require("../models/attendene.js");

const createEvent = async (req, res) => {


    const event = new Event(req.body);
    const result = await event.save();

    res.json({
        success: true,
        data: result
    })
};

const getEvent = async (req, res) => {
    const { searchQuery } = req.query;

    const query = {
        name: {
            $regex: new RegExp(searchQuery),
            $options: "i"
        }
    }
    const result = await Event.find({});


    res.json({
        status: true,
        data: result
    })
};

const joinEvent = async (req, res) => {
    try {
        const alreadyJoined = await Attendee.findOne({
            eventId:req.body.eventId,
            userId:req.user._id,
        })
        console.log(alreadyJoined);
        if(alreadyJoined){
            return res.status(401).json({
                status:false,
                message:"User Already Joined the event"
            })
        }

        const newAttendee = new Attendee({
            eventId: req.body.eventId,
            userId: req.user._id,
        });
        await newAttendee.save();
        res.json({
            status: true,
            message: "Event join successFully"
        });
    } catch (err) { }



};



module.exports = {
    createEvent,
    getEvent,
    joinEvent,
}