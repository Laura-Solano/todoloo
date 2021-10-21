require("dotenv").config();
const Express = require("express");
const db = require("./db");
const app = Express();
const middlewares = require("./middleware");
const controllers = require("./controllers");

app.use(Express.json());

app.use(middlewares.CORS)

app.use("/user", controllers.User);
app.use("/reviews", controllers.Reviews);
app.use("/reply", controllers.Reply);
app.use("/photo", controllers.Photo);

const resetDatabase = {force:true}
db.authenticate()
// add a resetDatabase inside the db.sync to drop all your tables if needed
// example:  .then(() => db.sync(resetDatabase))
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
