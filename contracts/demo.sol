pragma solidity ^0.5.0;

contract Demo {

    uint theNumber = 0;

    mapping (address => string) personalMessage;
    string publicMessage;

    function readTheNumber () public view returns (uint) {
        return theNumber;
    }

    function incrementTheNumber () public {
        theNumber++;
    }

    function setPublicMessage (string memory s) public {
        publicMessage = s;
    }

    function readPublicMessage () public view returns (string memory) {
        return publicMessage;
    }

    function setPersonalMessage (string memory s) public {
        personalMessage[msg.sender] = s;
    }

    function readPersonalMessage () public view returns (string memory) {
        return personalMessage[msg.sender];
    }
}