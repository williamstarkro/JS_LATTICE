const BlockLattice = require('./Index');
const Wallet = require('../wallet');
const Block = require('./Block');

describe('BlockLattice', () => {

	let bl, bl2, wallet;

	beforeEach(() => {

		bl = new BlockLattice();
		bl2 = new BlockLattice();
		wallet = new Wallet();
	});

	it('start with genesis block', () => {

		expect(bl.lattice["genesis"].chain[0]).toEqual(Block.genesisAccount("genesis"));
	});

	it('adds a new account', () => {

		bl.addNewAccount(wallet.publicKey);
		expect(bl.lattice[wallet.publicKey].chain[0].data[0]).toEqual(wallet.publicKey);
	});

	it('validates a valid lattice', () => {

		bl2.addNewAccount(wallet.publicKey);
		const data = 'foo';
		bl2.lattice[wallet.publicKey].addBlock(data);
		expect(bl.isValidLattice(bl2.lattice)).toBe(true);
	});

});