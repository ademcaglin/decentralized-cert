pragma solidity >=0.4.21 <0.6.0;

contract CertificateStorage {

    struct Issuer {
        uint created_at;
        uint disabled_at; 
        string title; 
        address admin;
    }
  
    struct Signer {
        uint created_at;
        uint disabled_at; 
        string title; 
        bytes32 issuer;
    }

    struct Certificate {
        address signer;
        uint created_at; 
        uint disabled_at;  
        bytes32 ipfs_hash; 
    }

    address public owner;
    mapping(bytes32 => Certificate) public certificates;
    mapping(address => Signer) public signers;
    mapping(bytes32 => Issuer) public issuers;

    constructor() public {
        owner = msg.sender;
        bytes32 issuerId = stringToBytes32("DECENTRALIZED_ISSUER");
        
        Issuer storage issuer = issuers[issuerId];
        issuer.title = "Decentralized Certificate Issuer";
        issuer.created_at = now;
        issuer.admin = msg.sender;

        Signer storage signer = signers[msg.sender];
        signer.title = "Owner";
        signer.created_at = now;
        signer.issuer = issuerId;
    }

    function createCertificate(bytes32 id, bytes32 ipfs_hash, uint created_at) public {
        require((now > (created_at + 1 days)) || (now < created_at), "The created_at is not valid.");
        Signer memory signer = signers[msg.sender];
        require(signer.issuer == stringToBytes32("DECENTRALIZED_ISSUER"), "The signer issuer should be ss");
        require(signer.created_at != 0, "The signer created_at is zero");
        require(signer.disabled_at == 0, "The account is not valid signer");
        Issuer memory issuer = issuers[signer.issuer];
        require(issuer.created_at != 0, "The signer has not a valid issuer");
        require(issuer.disabled_at == 0, "The signer has not a valid issuer");
        Certificate storage cer = certificates[id];
        cer.signer = msg.sender;
        cer.created_at = created_at;
        cer.ipfs_hash = ipfs_hash;
    }
  
    function getCertificate(bytes32 id)public view returns(address,uint,bytes32,string memory,string memory){
        Certificate memory cer = certificates[id];
        Signer memory signer = signers[cer.signer];
        Issuer memory issuer = issuers[signer.issuer];
        return(cer.signer,
        cer.created_at,
        cer.ipfs_hash,
        signer.title,
        issuer.title);
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
           return 0x0;
        }
        assembly {
           result := mload(add(source, 32))
        }
    }
    /* 
     * createIssuer()
     * disableCertificate()
     * disableIssuer()
     */
}