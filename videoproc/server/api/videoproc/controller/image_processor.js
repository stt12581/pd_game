import fs from 'fs';
import StorageConfig from '../../../config/storage.conf';

var total_result = [];

export default class ImageProcessor {

  static runProgram(img_path) {
    console.log("Send feature extraction request");

    var request = require('request');
    const url = 'http://localhost:8060?image_path=' + img_path;
    //console.log(img_path);

    request(url, function (error, response, content) {
      console.log("Received features");
      console.log("Send python-lstm request");
      
      var request2 = require('request');
      const url2 = 'http://localhost:8080';

      request2.post({uri: url2, body:content}, function (error, response, body) {
        console.log('Received EPA from LSTM: ', body);
        total_result.push(body);
      });
    });
  }

  static sendEPA(req, res) {
    var len = total_result.length;
    total_result.splice(0, len-1);
    res.contentType('application/json');
    res.send(JSON.stringify(total_result));
    console.log('Send EPA size: ', total_result.length);
    total_result = [];
  }
}
