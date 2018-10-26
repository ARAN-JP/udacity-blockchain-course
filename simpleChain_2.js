const SHA256 = require('crypto-js/sha256');
const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

function addLevelDBData(key, value){
  return new Promise(function(resolve, reject) {
    let self = this;
    self.db.put(key, value, function(err) {
      if (err) return console.log('Block' + key + 'submission failed', err);
    })
  })
}

function getLevelDBData(key){
  return new Promise(function(resolve, reject) {
    let self = this;
    self.db.get(key, function(err, value) {
      if (err) return console.log('Not found!',err);
      console.log('Value' + value);
    })
  })
}

function addDataToLevelDB(value){
  return new Promise(function(resolve,reject) {
    let self = this;
    self.self.db.createReadStream()
    .on('data', function(data) {
      dataArray.push(data);
    })
    .on('error', function(err) {
      reject(err);
    })
    .on('close', function() {
      resolve(dataArray);
  });
});


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

  addBlock(newBlock){
    //Add a new block into the chain, to assign the corresponding
    //height, hash, previous.previousBlockHash and time(timestamp)
    return new Promise(function(resolve, reject) {
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    newBlock.height = this.chain.length();
    newBlock.body = addDataToLevelDB(newBlock.height, JSON.stringify(newBlock).toString());
    newBlock.time = new Date().getTime().getTime().toString().slice(-3,0);
    if (this.chain.length>0) {
      newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
    }
    this.chain.push(newBlock);
    })
  }


  getBlockHeight(){
    // Count all block in the chain
    // give as a result the last height in the chain
    return new Promise((resolve, reject) {
      let self = this;
      self.db.createReadStream().on()
    })
  }



  getBlock(blockHeight){
    //Get block and return it as JSON string object
    let self = this;
    return new Promise((resolve, reject) {
      self.db.get(blockHeight).then(function(block){
        return resolve(JSON.parse(block));
      })
      .catch(function(err) {
        return reject('Not found', err);
      })
    });
  }


  validateBlock(blockHeight) {
    //validates Block data integrify
    //recalculate the hash and compare with the storage hash
    return new Promise(function(resolve, reject) {
      let self = this;
      self.db.createReadStream()
      .on('data',data => {
        this.validateBlock(block.height);
      })
      .on('error', function(err) {
        reject('Not found!', err);
      })
      .on('close', function() {
        resolve(validateBlock);
      })
  }


  validateChian(){
    //validates blockchain is still valid at any moment
    //each previousBlockHash with the hash of the previousblock
    return new Promise(function(resolve, reject){
      let self = this;
      self.db.createReadStream()
      .on('data', data => {

      })
    })
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
