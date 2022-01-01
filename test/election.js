//https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html
//accounts is an array that specifies available ETH accounts

const Election = artifacts.require("Election");

contract("Election", accounts => {
  it("initializes with two candidates", () => 
		Election.deployed()
			.then(instance => instance.candidatesCount())
			.then(count => {
				assert.equal(count,3)
			})
	);


//same test as above but uses async/await
	it("uses async/await notation to check initialization", async () => {
		const instance = await Election.deployed();
		const countCandidates = await instance.candidatesCount();
		const count = countCandidates;
		assert.equal(count, 3);
		}
	);

	//did not test for every initial instance; can update
	it("initializes candidates with correct values", async () => {
		const instance = await Election.deployed();
		const candidate = await instance.candidates(1);
		assert.equal(candidate[0], 1, "contains correct id");
		assert.equal(candidate[1], "Candidate 1", "contains the correct name");
	});

	//note: voters is a boolean (0 is false)
	//this tests that a voter from account[0] votes for candidate 2, and that now voter 1 has voted once
	it("checks that a voter can vote", async () => {
		const instance = await Election.deployed();
		const voted = await instance.vote(2, {from:accounts[0]});
		const voterresult = await instance.voters(accounts[0]);
		assert.equal(voterresult, 1, "voter 1 voted");

	});

	//this test that voter from account[1] voted for candidate 1, and candidate 1 now has just 1 vote
	it("checks that a candidate got a vote from a voter", async () => {
		const instance = await Election.deployed();
		const voted = await instance.vote(1, {from:accounts[1]});
		const candidate = await instance.candidates(1);
		assert.equal(candidate[3], 1, "got a vote");

	});

	it("throws an exception if there's double voting", async() => {
		const instance = await Election.deployed();
		
		//account 3 votes for candidate 3
		const voted = await instance.vote(3, {from:accounts[3]});
		const voterResult = await instance.voters(accounts[3]);
		//assert.equal(voterResult, 1, "voter 3 voted");
		try {
			//try having voter 3 vote again for candidate 3
			const tryVotingAgain = await instance.vote(3, {from:accounts[3]});
		} catch (error) {
			//error should be thrown since voters are allowed to only vote for one candidate
			assert(error.message, "error message must contain revert");
		}
		//check candidate 3 has just one vote
		const candidate = await instance.candidates(3);
		assert.equal(candidate[3], 1, "candidate 3 should just get one vote");

	});

});




