import VideoprocRoute from "../api/videoproc/route/videoproc-route";


export default class Routes {
   static init(app, router) {
     VideoprocRoute.init(router);
     app.use("/", router);
   }
}
