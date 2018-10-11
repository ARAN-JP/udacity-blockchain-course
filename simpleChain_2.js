const SHA256 = require('crypto-js/sha256');
const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

function addLevelDBData(key, value){
  db.put(key, value, function(err) {
    if (err) return console.log('Block' + key + 'submission failed', err);
  })
}

function getLevelDBData(key){
  db.get(key, function(err, value) {
    if (err) return console.log('Not found!', err);
    console.log('Value' + value);
  })
}

function addDataToLevelDB(value){
  return new Promise(function(resolve,reject) {
    self.db.createReadStream()
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
      return Block("Latest Block in the chain + Genesis Block")
   }

  addBlock(newBlock){
    //Add a new block into the chain, to assign the corresponding
    //height, hash, previous.previousBlockHash and time(timestamp)
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    newBlock.height = this.chain.length();
    newBlock.body = addDataToLevelDB(newBlock.height, JSON.stringify(newBlock).toString());
    newBlock.time = new Date().getTime().getTime().toString().slice(-3,0);
    if (this.chain.length>0) {
      newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
    }
    this.chain.push(newBlock);
  }


  getBlock(blockHeight){
    //Get block and return it as JSON string object
    addDataToLevelDB(blockHeight).then((value) => {
      console.log(JSON.parse(value));
    }).catch(err => {
      console.log(err);
    })


  getBlockHeight(){
    // Count all block in the chain and give as a result the height in the chainght
      let count = 0;
      getBlockHeight().then((height) => {
        newBlock.height = height + 1;
      })
      createReadStream()
      .on('data',data => {count++;})
      .on('close', () => {
        console.log('Count of block is '+ count);
      });
  }


  validateBlock(blockHeight) {
    //validates Block data integrify
    //recalculate the hash and compare with the storage hash
    
  validateChian(){
    //validates blockchain is still valid at any moment
    //each previousBlockHash with the hash of the previousblock

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
