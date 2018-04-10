const Block = require('./Block');
const Wallet = require('../wallet');

describe('Block', () => {

	let data, lastBlock, block, wallet;

	beforeEach(() => {
		wallet = new Wallet();
		data = 'bar';
		lastBlock = Block.genesisAccount(wallet.publicKey);
		block = Block.mineBlock(lastBlock, data);
	});

	it('sets the `data` to match the input', () => {
		expect(block.data).toEqual(data);
	});

	it('sets the `lastHash` to match the hash of the last block', () => {
		expect(block.lastHash).toEqual(lastBlock.hash);
	});

	it('generates hash that matches the difficulty', () => {
		expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
	});

	it('lowers the difficulty for slowly mined blocks', () => {
		expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1);
	});

	it('raises the difficulty for quickly mined blocks', () => {
		expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
	});
});