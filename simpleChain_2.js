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
    addDataToLevelDB(newBlock.height,
                     JSON.stringify(newBlock).toString());
  }

  self.getBlockHeight().then((height) => {
    newBlock.Height = height + 1;
  })

  getBlockCount(){
    let self = this;
    return new Promise(function(resolve, reject){
      let i = 0;
      self.db.createReadStream().on('data', function (data){
        i = i + 1;
      })
      .on('error', function (err) {
        reject(err)
      })
      .on('close', function (){
        resolve(i - 1);
      });
    });
  }

  getBlock(blockHeight){
    db.get(key, function(err, value){
      if (err) return console.log('Not found!', err);
      callback(value);
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
