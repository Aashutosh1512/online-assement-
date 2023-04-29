import  mongoose from "mongoose";

export default async function connect(){
    //store it into the env file 
    await mongoose.connect("mongodb+srv://admin:admin123@cluster0.ne6eyhh.mongodb.net/?retryWrites=true&w=majority");
    console.log("CONNECTED TO THE DATABASE....")
}   