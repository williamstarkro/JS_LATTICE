const ChainUtil = require('../chain-util')
const Data = require('./Data');

class Wallet {

	constructor() {
		this.keyPair = ChainUtil.genKeyPair();
		this.publicKey = this.keyPair.getPublic().encode('hex');
	}

	toString() {
		return `Wallet - 
		publicKey: ${this.publicKey.toString()}
		balance  : ${this.balance}`;
	}

	sign(dataHash) {
		return this.keyPair.sign(dataHash);
	}

	createTransaction(recipient, amount, blockchain) {

		if (amount > this.balance) {
			console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`)
			return;
		}

		if (transaction) {

			transaction.update(this, recipient, amount);
		} else {

			transaction = Data.newTransaction(this, recipient, amount);
			transactionPool.updateOrAddTransaction(transaction);
		}

		return transaction;
	}

	static blockchainWallet() {
		const blockchainWallet = new this();
		blockchainWallet.address = 'blockchain-wallet';
		return blockchainWallet;
	}
}

module.exports = Wallet;