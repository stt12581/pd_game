import fs from 'fs';
import StorageConfig from '../../../config/storage.conf';
import ImageProcessor from './image_processor.js';

export default class VideoprocController {
  static uploadImage(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let blobs = [];
    req.on('end', function() {
        if (!fs.existsSync(StorageConfig.storageDir)) {
          fs.mkdirSync(StorageConfig.storageDir);
        }

        let image_data = Buffer.concat(blobs);
        let path = StorageConfig.storageDir + StorageConfig.getTimestamp() + StorageConfig.getExtension();
        fs.writeFile(path, image_data, (err) => {
          if (err || image_data.length === 0) {
            return res.status(500).end();
          }
          ImageProcessor.runProgram(path);
          return res.status(200).end();
        });
    });
    req.on('readable', function() {
      let blob = req.read();
      blobs.push(blob);
    });
  }

  static getCsrf(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send({csrfToken: req.csrfToken()});
  }
}
