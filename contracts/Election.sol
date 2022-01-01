pragma solidity >=0.4.22 <0.8.0;

contract Election {
    // Read/write candidate
	struct Candidate {
		uint id;
		string name;
		string party;
		uint voteCount;
	}

	//stores key-valule pairs
	mapping(uint => Candidate) public candidates;
	mapping(address => bool) public voters;

	//store candidates count
	uint public candidatesCount;

    // Constructor
    constructor () public {
        addCandidate("Candidate 1", "Green");
        addCandidate("Candidate 2", "Blue");
    }

	function addCandidate(string memory _name, string memory _party) private {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0);

	}

	function vote(uint _candidateId) public {
		require(!voters[msg.sender]);
		require(_candidateId > 0 && _candidateId <= candidatesCount);
		voters[msg.sender] = true;
		candidates[_candidateId].voteCount++;
	}

}
