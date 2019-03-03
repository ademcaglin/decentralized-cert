pragma solidity >=0.4.21 <0.6.0;

contract CertificateStorage {
  struct Issuer {
        string name; 
  }
  struct Signer {
        address addr;
        uint created_at;
        uint disabled_at; 
        string title; 
  }
  struct Certificate {
        address addr;
        uint created_at;  
        string ipfs_addr; 
        string title; 
  }
  
  mapping(bytes32 => Certificate)  public certificates;

  function createCertificate(bytes32 id, string memory ipfs_addr) public {
        Certificate storage sender = certificates[id];
        sender.addr = msg.sender;
        sender.created_at = now;
        sender.ipfs_addr = ipfs_addr;
  }
  
  function getCertificate(bytes32 id)public view returns(address,uint,string memory){
      return(certificates[id].addr, certificates[id].created_at, certificates[id].ipfs_addr);
  }
}
