const { default: mongoose } = require("mongoose");

const attendeeSchema={
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
   
};
const Attendee=mongoose.model("attendee",attendeeSchema);
module.exports=Attendee;