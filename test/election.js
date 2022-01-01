//https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html
//accounts is an array that specifies available ETH accounts

const Election = artifacts.require("Election");

contract("Election", accounts => {
  it("initializes with two candidates", () => 
		Election.deployed()
			.then(instance => instance.candidatesCount())
			.then(count => {
				assert.equal(count,2)
			})
	);

//same test as above but uses async/await
	it("uses async/await notation to check initialization", async () => {
		const instance = await Election.deployed();
		const countCandidates = await instance.candidatesCount();
		const count = countCandidates;
		assert.equal(count, 2);
		}
	);

	//did not test for every initial instance; can update
	it("initializes candidates with correct values", async () => {
		const instance = await Election.deployed();
		const candidate = await instance.candidates(1);
		assert.equal(candidate[0], 1, "contains correct id");
		assert.equal(candidate[1], "Candidate 1", "contains the correct name");
	});

	it("checks that a voter can vote", async () => {
		const instance = await Election.deployed();
		const voted = await instance.vote(2, {from:accounts[0]});
		const voterResult = await instance.voters(accounts[0]);
		assert.equal(voterResult, 1, "voter 1 voted");

	});
});




