const SHA256 = require('crypto-js/sha256');
const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);


function addLevelDBData(key, value){
  let self = this;
  return new Promise((resolve, reject) => {
    self.db.put(key, value, (err) => {
      if (err) return console.log('Block' + key + 'submission failed', err);
    });
  });
}

function getLevelDBData(key){
  let self = this;
  return new Promise((resolve, reject) => {
    self.db.get(key, (err, value) => {
      if (err) return console.log('Not found!',err);
      resolve(value);
    });
  });
}

function addDataToLevelDB(value){
  let self = this;
  return new Promise((resolve, reject) => {
    self.db.createReadStream()
    .on('data', (data) => {
      i++;
    })
    .on('err', (err) => {
      reject('Unable to read data stream', err);
    })
    .on('close', () => {
      resolve('Block #' + i);
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
    this.addBlock(new Block("First block in the chain - Genesis block"));
}

   createGenesisBlock(){
      return new Block("First Block in the Chain - Genesis Block")
   }

   getLatestBlock(){
     return this.chain[this.chain - 1];
   }

  getBlockHeight() {
    let self = this;
    return new promise((resolve, reject) => {
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


  addBlock(newBlock){
    //Add a new block into the chain, to assign the corresponding
    //height, hash, previous.previousBlockHash and time(timestamp)
    return new Promise((resolve, reject) => {
      self.getBlockHeight().then((height) => {
        newBlock.height = height + 1;
        newBlock.time = new Date().getTime().getTime().toString().slice(-3,0);
      })
    if (this.chain.length>0) {
      newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
    }
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
   });
   addDataToLevelDB(newBlock.height, JOSN.stringify(newBlock).toString());
   this.chain.push(newBlock);
 });
}


  getBlock(blockHeight){
    //Get block and return it as JSON string object
    let self = this;
    return new Promise((resolve, reject) => {
      self.db.getLevelDBData(blockheight).then((value) => {
        resolve(JSON.parse(value));
      })
      .catch((err) => {
        reject('Not found', err);
      });
    });
  }

  getBlockCount(){
    let self = this;
    return new Promise((resolve, reject) => {
      let count = 0;
      self.db.createReadStream()
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
    //recalculate the hash and compare with the storage hash
    let self = this;
    return new Promise((resolve, reject) => {
      self.db.getLevelDBData(blockheight).then((value) => {
        let block =JSON.parse(value);
        let blockHash = block.hash;
        let validBlockHash = JSON.parse(blockHash);
        if (validBlockHash === blockHash) {
          resolve(true);
        } else {
          resolve(false);
        };
     });
  });


  validateChian(){
    //validates blockchain is still valid at any moment
    //each previousBlockHash with the hash of the previousblock
    let self = this;
    return new Promise((resolve, reject) => {
      self.db.getLevelDBData(validateBlock).then((value) => {
        if (validateBlock !== previousBlockHash) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
   });
 }

(function theLoop (i){
  setTimeout(function () {
    let blockTest = new Block.Block("Test Block - " + (i + 1));
    myBlockChain.addNewBlock(blockTest).then((result) => {
      console.log(result);
      i++;
      if (i < 10) theLoop(i);
    });
  }, 10000);
})(0);

let blockchain.chain