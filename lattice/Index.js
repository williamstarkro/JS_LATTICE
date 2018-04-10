const Blockchain = require('./Blockchain');
const Block = require('./Block');

class BlockLattice {
	constructor() {
		this.lattice = {}
		this.lattice["genesis"] = new Blockchain("genesis");
	}

	addNewAccount(key) {

		this.lattice[key] = new Blockchain(key);
	}

	sendBlock(sender, recipient, data) {

		this.lattice[sender].addBlock(data);
		
	}

	isValidLattice(lattice) {
		
		for (var chain in lattice) {
			if(JSON.stringify(lattice[chain].chain[0]) !== JSON.stringify(Block.genesisAccount(chain))) return false;
		
			for (let i = 1; i<lattice[chain].length; i++) {
				const block = lattice[chain].chain[i];
				const lastBlock = lattice[chain].chain[i-1];

				if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
					return false;
				}
			}
			return true;
		}
	}

}

module.exports = BlockLattice;
