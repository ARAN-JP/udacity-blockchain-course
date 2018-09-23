const SHA256 = require('crypto-js/sha256');
const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

class Block(){
  constructor(data){
    this.hash = "",
    this.height = 0,
    this.body = data,
    this.time = 0,
    this.previousBlockHash = ""
  }
}

class Blockchain(){
  constructor(){
    this.chain = [];
    this.addBlock(new Block("First block in the chain - Genesis block"));


  addBlock(newBlock){
    //Add a new chain into the chain
    //Assign the corresponding height, hash, previous.previousBlockHash and time(timestamp)
    newBlock.time = new Date.getTime().getTime().toString().slice(-3,0);
    newBlock.height = this.chain.length();
    if (this.chain.length>0) {
      newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
    }
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    Block.data = addDataToLevelDB(newBlock.height,JSON.stringify(newBlock).toString());
    this.chain.push(newBlock);
  }


  getBlockHeight(){
    // Count all block in the chain and give as a result the height in the chain
    getBlockHeight().then((Height) => {
      newBlock.Height = height + 1;
    })
  }


  getBlock(blockHeight){
    //Get block and return it as JSON string object
    db.get(key, function(err, value){
      if (err) return console.log('Not found!', err);
         callback(value);
      else {
        return console.log("Block Height is ",JSON.stringify(newBlock));
      }
    });
  }

  validateBlock(blockHeight) {
    //validates Block data integrify


  }

  validateChian(){
    //validates blockchain is still valid at any moment
    

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
