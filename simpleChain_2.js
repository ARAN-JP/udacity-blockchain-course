const SHA256 = require('crypto-js/sha256');
const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);


function addLevelDBData(key, value){
  return new Promise(function(resolve, reject) {
    db.put(key, value, (err) => {
      if (err) return console.log('Block' + key + 'submission failed', err);
    });
  });
}

function getLevelDBData(key){
  return new Promise(function(resolve, reject) {
    db.get(key, (err, value) => {
      if (err) return console.log('Not found!',err);
      resolve(value);
    });
  });
}

function addDataToLevelDB(value){
  return new Promise(function(resolve, reject) {
    let i = 0;
    db.createReadStream()
    .on('data', (data) => {
        i++;
    })
    .on('err', (err) => {
        console.log('Unable to read data stream', err);
        reject(err);
    })
    .on('close', () => {
        console.log('Block #' + i);
        resolve(i);
        addLevelDBData(i, value)
     });
  });
}


//--------------------------------------------------------------------//
class Block {
  constructor(data){
    this.hash = "",
    this.height = 0,
    this.body = data,
    this.time = 0,
    this.previousBlockHash = ""
  }
}

class Blockchain {
  constructor(){
    this.chain = [];
    this.getBlock().then((height) => {
      if (height === 0) {
        let newBlock = new Block('First block in the chain - Genesis block')
      }
    })
}


  getBlockHeight() {
    let self = this;
    return new Promise((resolve, reject) => {
      let i = 0;
      self.db.createReadStream()
      .on('data', (data) => {
          i++;
        })
      .on('error', (err) => {
          console.log('Unable to find current height', err);
          reject(err);
      })
      .on('close', () => {
          console.log('current height #' + (i - 1));
          resolve(i);
      });
    });
  }


  //Add a new block into the chain, to assign the corresponding
  //height, hash, previous.previousBlockHash and time(timestamp)

  addBlock(newBlock){
    let self = this;
    return new Promise((resolve, reject) => {
      newBlock.height = self.getLevelDBData().then((value) => {
         height++;
      })
      newBlock.time = new Date().getTime().toString().slice(-3,0);
      if (newBlock.height > 0) {
        self.getLevelDBData().then((value) => {
          newBlock.previousBlockHash = self.chain[newBlock.height-1].hash;
        })
      newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
      addDataToLevelDB(newBlock.height,JSON.stringify(newBlock).toString());
    });
  }
}


  getBlock(blockHeight){
    //Get block and return it as JSON string object
    let self = this;
    return new Promise((resolve, reject) => {
      let blockHeight = newBlock.height;
      self.getLevelDBData(blockHeight, (err, value) => {
        if (err) {
           console.log('Not found', err)
           reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  getBlockCount(){
    let self = this;
    return new Promise((resolve, reject) => {
      let count = 0;
      self.createReadStream()
      .on('data', (data) => {
          count++;
      })
      .on('Error', (err) => {
          console.log('Unable to count block', err);
          reject(err);
      })
      .on('close', () => {
          resolve(count);
      });
    });
  }

  validateBlock(blockHeight) {
    //validates Block data integrify
    // recalculate the hash
    // and compare with the storage hash
    let self = this;
    return new Promise((resolve, reject) => {
      self.getLevelDBData(blockHeight).then((value) => {
        let block = JSON.parse(value);
        let blockHash = block.hash;
        let validBlockHash = SHA256(JSON.parse(blockHash));
        if (validBlockHash === blockHash) {
          resolve(true);
        } else {
          resolve(false);
        };
     });
   });
 }

  validateChain() {
    // Compare each block.previousHash with the hash of the previousBlock
    let self = this;
    return new Promise((resolve, reject) => {
      self.getLevelDBData(validateBlock).then((value) => {
        let block = JSON.parse(value);
        let chain = newBlock.previousBlockHash;
        let validateChain = JSON.parse(chain);
        if (validateChain === block.previousBlockHash) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
   });
  }
}

/*(function theLoop (i) {
  setTimeout(function () {
    let i = 0;
    let blockTest = new Block("Test Block - " + (i + 1));
    Blockchain.addBlock(blockTest).then((result) => {
      console.log(result);
      i++;
      if (i < 10) theLoop(i);
    })
    .catch((err) => {
      console.log('addBlock Error in getBlock loop' + err);
    });
   },10000);
 })(0);*/
