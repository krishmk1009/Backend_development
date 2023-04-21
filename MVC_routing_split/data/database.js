
import mongoose from "mongoose";

export const connectDb = () => {

    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("connnected succesfully")
    })
        .catch((e) => {
            console.log(e)
        });
}
