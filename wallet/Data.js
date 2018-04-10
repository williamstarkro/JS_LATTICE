const ChainUtil = require('../chain-util');

class Data {
	constructor() {

		this.id = ChainUtil.id();
		this.input = null;
		this.outputs = [];
	}

	static sendTransaction(senderWallet, recipient, item) {
		const sendTransaction = new this();

		if ($.inArray(item, senderWallet.itemArray)) {
			console.log(`Account does not have Item: ${item}`);
			return;
		}

		transaction.outputs.push(...[
			{ item: item, address: recipient, status: status },
		])

	}

	static newTransaction(senderWallet, recipient, item) {
		const transaction = new this();

		if ($.inArray(item, senderWallet.itemArray)) {
			console.log(`Account does not have Item: ${item}`);
			return;
		}

		transaction.outputs.push(...[
			{ item: item, address: recipient },
		])

		Data.signTransaction(transaction, senderWallet);

		return transaction;
	}

	static signTransaction(transaction, senderWallet) {

		transaction.input = {
			timestamp: Date.now(),
			item: item,
			address: senderWallet.publicKey,
			signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
		}
	}

	static verifyTransaction(transaction) {
		return ChainUtil.verifySignature(transaction.input.address, transaction.input.signature, ChainUtil.hash(transaction.outputs));
	}
}

module.exports = Data;