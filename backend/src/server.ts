import app from "./main.js";
import dbCondig from "./config/db.config.js";

dbCondig().then(() => {
  app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
  });
});
