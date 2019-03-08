pragma solidity >=0.4.21 <0.6.0;

contract CertificateStorage {
      
    struct IssuerAuthority {
        uint created_at;
        string title; 
    }

    struct Issuer {
        uint created_at;
        uint disabled_at; 
        string title; 
        address authority;
    }
  
    struct Signer {
        uint created_at;
        uint disabled_at; 
        string title; 
        address issuer;
    }

    struct Certificate {
        address signer;
        uint created_at; 
        uint disabled_at;  
        bytes32 ipfs_hash; 
        bytes2 ipfs_alg;
    }
  
    mapping(bytes32 => Certificate)  public certificates;
    mapping(address => Signer)  public signers;
    mapping(address => Issuer)  public issuers;
    mapping(address => IssuerAuthority)  public issuerAuthorities;

    function createCertificate(bytes32 id, bytes2 ipfs_alg, bytes32 ipfs_hash) public {
        Certificate storage cer = certificates[id];
        cer.signer = msg.sender;
        cer.created_at = now;
        cer.ipfs_hash = ipfs_hash;
        cer.ipfs_alg = ipfs_alg;
    }
  
    function getCertificate(bytes32 id)public view returns(address,uint,bytes32,string memory,string memory,string memory){
        Certificate memory cer = certificates[id];
        Signer memory signer = signers[cer.signer];
        Issuer storage issuer = issuers[signer.issuer];
        IssuerAuthority storage authority = issuerAuthorities[issuer.authority];
        return(cer.signer,
        cer.created_at,
        cer.ipfs_hash,
        signer.title,
        issuer.title,
        authority.title);
    }
}