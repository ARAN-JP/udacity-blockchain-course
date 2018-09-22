const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(data){
    this.hash = '';
    this.time = 0;
    this.data = data;
    this.previousBlockHash = '0x';
    this.height = 0;
  }
}

class Blockchain{
   constructor(){
     this.chain = [];
     this.addBlock(new Block("First block in the chain - Generate block"));
   }
   addBlock(newBlock){
     newBlock.time = new Date().getTime().toString().slice(0,-3);
     newBlock.height = this.chain.length;
     if (this.chain.length>0){
       newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
     }
     newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
     this.chain.push(newBlock);
   }
 }
