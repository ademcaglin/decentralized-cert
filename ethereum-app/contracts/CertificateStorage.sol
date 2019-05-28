pragma solidity >=0.4.21 <0.6.0;

contract CertificateStorage {

    struct Issuer {
        uint dateOfCreation;
        uint dateOfInactivating; 
        string title; 
        bytes32 certificateType;
        address admin;
        address[] signerKeys;
    }
  
    struct Signer {
        uint dateOfCreation;
        uint dateOfInactivating;  
        bytes32 issuer;
        bytes32[] certificateKeys;
    }

    struct Certificate {
        address signer;
        uint dateOfIssue; 
        uint dateOfRevocation;  
        bytes32 ipfsHash;
        string properties; 
    }

    address public owner;
    bytes32[] public issuerKeys;
    mapping(bytes32 => Certificate) public certificates;
    mapping(address => Signer) public signers;
    mapping(bytes32 => Issuer) public issuers;

    constructor() public {
        owner = msg.sender;
        string memory issuerTitle = "Decentralized Issuer";
        createIssuer(issuerTitle, "NONE", owner, now);
        createSigner(owner, now, keccak256(bytes(issuerTitle)));
    }

    function createIssuer(string memory title, bytes32 certificateType, address admin, uint dateOfCreation) public{
        bytes32 key = keccak256(bytes(title));
        require(owner == msg.sender, "The message sender does not have permission"); 
        require(issuers[key].dateOfCreation == 0, "The issuer already exists");
        checkDate(dateOfCreation);
        Issuer storage issuer = issuers[key];
        issuer.title = title;
        issuer.dateOfCreation = dateOfCreation;
        issuer.admin = admin;
        issuer.certificateType = certificateType;
        issuerKeys.push(key);
    }

    function createSigner(address key, uint dateOfCreation, bytes32 issuerKey) public {
        Issuer storage issuer = issuers[issuerKey];
        require(issuer.dateOfCreation != 0, "The issuer does not found");
        require(issuer.admin == msg.sender, "The sender does not have permission");
        Signer memory exist = signers[key];
        require(exist.dateOfCreation == 0, "The signer already exists");
        checkDate(dateOfCreation);
        Signer storage signer = signers[key];
        signer.dateOfCreation = dateOfCreation;
        signer.issuer = issuerKey;
        issuer.signerKeys.push(key);   
    }

    function createCertificate(bytes32 key, bytes32 ipfsHash, uint dateOfIssue) public {
        Signer storage signer = signers[msg.sender];
        require(signer.dateOfCreation != 0, "The signer is not trusted");
        require(signer.dateOfInactivating == 0, "The signer is not valid");
        Issuer memory issuer = issuers[signer.issuer];
        require(issuer.dateOfCreation != 0, "The signer has not issuer");
        require(issuer.dateOfInactivating == 0, "The signer has not a valid issuer");
        checkDate(dateOfIssue);
        Certificate storage cer = certificates[key];
        cer.signer = msg.sender;
        cer.dateOfIssue = dateOfIssue;
        cer.ipfsHash = ipfsHash;
        signer.certificateKeys.push(key);
    }

    function getIssuerSignerKeys(bytes32 key)public view returns(address[] memory){
        Issuer memory issuer = issuers[key];  
        return(issuer.signerKeys);
    }

    function isValidSigner(address key)public view returns(bool){
        Signer memory signer = signers[key]; 
        return signer.dateOfCreation != 0 && signer.dateOfInactivating == 0;
    }

    function getSignerCertificateKeys(address key)public view returns(bytes32[] memory){
        Signer memory signer = signers[key];  
        return(signer.certificateKeys);
    }
  
    function getCertificate(bytes32 id)public view returns(uint,bytes32,string memory,uint){
        Certificate memory cer = certificates[id];
        Signer memory signer = signers[cer.signer];
        Issuer memory issuer = issuers[signer.issuer];
        return(cer.dateOfIssue,
        cer.ipfsHash,
        issuer.title,
        cer.dateOfRevocation);
    }

    function checkDate(uint date) private view{
        require(now < (date + 1 days), "The date is not suitable for now .");
        require((now + 10 minutes) > date, "The date is greater than now .");
    }
}