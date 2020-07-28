const fs = require('fs');
const path = require('path');

const logPath = path.resolve(__dirname, 'log/log.json');

const logger = (timestamp, productId, action) => {
    console.log(`logger works.`);
    fs.readFile(logPath, 'utf-8', (err, data) => {
        if (err) { 
                fs.writeFile(logPath, '[]', (err) => {
                if (err) {
                  console.log(`Error logging at: ${timestamp}.`);
                } else {
                  console.log('Log file created.');
                }
              });
        } else {  console.log('no error');
            let logJson = JSON.parse(data);
            
            logJson.push({"timestamp": timestamp, "productId": productId, "action": action});

            fs.writeFile(logPath, JSON.stringify(logJson,null,4), err => {
                if (err) {
                    console.log(`Can't insert record in log file.`);
                    return 0;
                } else {
                    console.log(`Action logged successfully.`);
                    return 1;    
                }
            });
        }
      }); 
}

module.exports = logger;