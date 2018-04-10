const BlockLattice = require('./Index');
const Blockchain = require('./Blockchain');
const Block = require('./Block');
const Wallet = require('../wallet');

describe('Blockchain', () => {

	let bl, bl2;

	beforeEach(() => {
		bl = new BlockLattice();
		bl2 = new BlockLattice();
		w1 = new Wallet();
		w2 = new Wallet();
		bl.addNewAccount(w1.publicKey);
		bl.addNewAccount(w2.publicKey);
		bl2.addNewAccount(w1.publicKey);
		bl2.addNewAccount(w2.publicKey);
	});

	it('start with genesis block', () => {

		expect(bl.lattice["genesis"].chain[0]).toEqual(Block.genesisAccount("genesis"));
	});

	it('adds a new block', () => {

		const data = 'foo';
		bl.lattice[w1.publicKey].addBlock(data);
		expect(bl.lattice[w1.publicKey].chain[bl.lattice[w1.publicKey].chain.length - 1].data).toEqual(data);
	});

	it('validates a valid chain', () => {

		const data = 'foo';
		bl.lattice[w2.publicKey].addBlock(data);
		expect(bl.lattice[w1.publicKey].isValidChain(bl.lattice[w2.publicKey].chain, w2.publicKey)).toBe(true);
	});

	it('invalidates a chain with a corrupt genesis block', () => {

		bl.lattice[w2.publicKey].chain[0].data = 'Bad Data';
		expect(bl.lattice[w1.publicKey].isValidChain(bl.lattice[w2.publicKey].chain, w2.publicKey)).toBe(false);
	});

	it('invalidates a corrupt chain', () => {

		bl.lattice[w2.publicKey].addBlock('foo');
		bl.lattice[w2.publicKey].chain[1].data = 'Not Foo';
		expect(bl.lattice[w1.publicKey].isValidChain(bl.lattice[w2.publicKey].chain, w2.publicKey)).toBe(false);
	});

	it('replaces the chain with a valid chain', () => {

		bl.lattice[w1.publicKey].addBlock('goo');
		bl2.lattice[w1.publicKey].replaceChain(bl.lattice[w1.publicKey].chain, w1.publicKey);
		expect(bl.lattice[w1.publicKey]).toEqual(bl2.lattice[w1.publicKey]);
	});

	it('does not replace the chain with one of less than or equal to length', () => {

		bl.lattice[w1.publicKey].addBlock('goo');
		bl.lattice[w1.publicKey].replaceChain(bl2.lattice[w1.publicKey].chain, w1.publicKey);
		expect(bl.lattice[w1.publicKey]).not.toEqual(bl2.lattice[w1.publicKey]);
	});

	it('does not replace the chain with a chain of a different account', () => {

		bl.lattice[w1.publicKey].addBlock('goo');
		bl2.lattice[w2.publicKey].replaceChain(bl.lattice[w1.publicKey].chain, w1.publicKey);
		expect(bl.lattice[w1.publicKey]).not.toEqual(bl2.lattice[w2.publicKey]);
	});
});





















