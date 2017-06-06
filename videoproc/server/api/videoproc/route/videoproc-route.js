import VideoprocController from "../controller/videoproc-controller";
import ImageProcessor from "../controller/image_processor";

export default class VideoprocRoutes {
  static init(router) {
    router
    .route("/api/upload")
    .post(VideoprocController.uploadImage);

    router
    .route("/api/csrf")
    .get(VideoprocController.getCsrf);

    router
    .route("/api/sendEPA")
    .get(ImageProcessor.sendEPA);
  }
}
