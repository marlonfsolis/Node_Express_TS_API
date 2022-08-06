import {Express} from "express";

import {debug} from "./debuggers";

import routes_index from "../routes/index";
import routes_users from "../routes/users";



const routesLoader = (app: Express) => {

    debug("Loading routes");

    app.use("/api", routes_index);
    app.use("/api/users", routes_users);
};

export default routesLoader;
