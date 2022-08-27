const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database")

//handling UncaughtException

process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Dwon the Server due to Uncaught Exception`);
    process.exit(1);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
connectDatabase();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT || 4000, ()=>{

    console.log(`Server is Running on ${process.env.PORT}`)
});
//for unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Dwon the Server due to Unhandled Rejection`);

    server.close(()=>{
        process.exit(1);
    });
})