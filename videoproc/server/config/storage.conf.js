import fs from "fs";

export default class StorageConfig {

    static storageDir = process.cwd() + '/tmp/';
    
    static expiryDiff = 60000;

    static getTimestamp(granularity) {

        let msTimestamp = () => {
            return new Date().getTime();
        }
        let nsTimestamp = () => {
            return hrTime[0] * 1000000 + hrTime[1] / 1000;
        }

        if (!granularity || granularity === 'ms') {
            return msTimestamp();
        } 
        if (granularity === 'ns') {
            return nsTimestamp();
        }
    }

    static getExtension() {
        return '.jpg';
    }

    static startClearingExpiredData() {
        setInterval(() => {
            //console.log("Clearing expired data.");
            fs.readdir(StorageConfig.storageDir, (error, files) => {
                let current_timestamp = StorageConfig.getTimestamp();
                for (let i = 0, len = files.length; i < len; ++i) {
                    let file = files[i];
                    let timestamp = file.slice(0, -StorageConfig.getExtension().length);
                    let diff = current_timestamp - timestamp;
                    if (diff > StorageConfig.expiryDiff) {
                        let path = StorageConfig.storageDir + file;
                        fs.unlinkSync(path);
                    }
                }
            });
        }, 1000);
    }
}
