const Wallet = require('../wallet');
const Transaction = require('../wallet/Transaction');

class Miner {

	constructor(blockchain, transactionPool, wallet, p2pServer) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;
		this.p2pServer = p2pServer;
	} 

	mine () {
		const validTransactions = this.transactionPool.validTransactions();

		// include a reward for the miner
		validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
		// create a block consisting of the valid transactions
		const block = this.blockchain.addBlock(validTransactions);
		// synchronize the chains in the peer2peer server
		this.p2pServer.syncChains();
		// clear transaction pool and broadcast the cleared pool
		this.transactionPool.clear();
		this.p2pServer.broadcastClearTransactions();

		return block;
	}
}

module.exports = Miner;