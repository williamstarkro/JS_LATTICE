const Block = require('./Block');

class Blockchain {
	constructor(account) {
		this.chain = [Block.genesisAccount(account)];
		this.account = account;
	}

	addBlock(data) {

		const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
		this.chain.push(block);

		return block;
	}

	pendBlock(data) {

		const block = Block
	}

	isValidChain(chain, wallet) {
		if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisAccount(wallet))) return false;
	
		for (let i = 1; i<chain.length; i++) {
			const block = chain[i];
			const lastBlock = chain[i-1];

			if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
				return false;
			}
		}
		return true;
	}

	replaceChain(newChain, wallet) {

		if (newChain.length <= this.chain.length) {
			console.log('received chain is not longer than the current chain');
			return;
		}else if (this.account !== wallet) {
			console.log('trying to change different chains');
			return;
		} else if (!this.isValidChain(newChain, wallet)) {
			console.log('the received chain is not valid');
			return;
		} 

		console.log('replacing blockchain with new chain');
		this.chain = newChain;
	}
}

module.exports = Blockchain;