pragma solidity >=0.4.21 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CertificateStorage.sol";

contract TestCertificateStorage {
   function testOwnerShouldBeCreated() public {
       CertificateStorage certificateStorage = CertificateStorage(DeployedAddresses.CertificateStorage());
       Assert.equal(certificateStorage.owner(), msg.sender, "An owner is different than a deployer");
   }

   function testSignerShouldBeCreated() public {
      CertificateStorage certificateStorage = CertificateStorage(DeployedAddresses.CertificateStorage());
      string memory title;
      bytes32 issuer;
      uint created_at;
      uint disabled_at;
      (created_at, disabled_at, title, issuer) = certificateStorage.signers(certificateStorage.owner());
      string memory expected = "Owner";
      Assert.isNotZero(created_at, "The signer created_at is zero");
      Assert.equal(title, expected, "The signer is not created");
   }
   
   function testIssuerShouldBeCreated() public {
      CertificateStorage certificateStorage = CertificateStorage(DeployedAddresses.CertificateStorage());
      bytes32 issuerId = stringToBytes32("DECENTRALIZED_ISSUER");
      string memory title;
      bytes32 authority;
      uint created_at;
      uint disabled_at;
      address admin;
      (created_at, disabled_at, title, authority, admin) = certificateStorage.issuers(issuerId);
      string memory expected = "Decentralized Certificate Issuer";
      Assert.isNotZero(created_at, "The created_at is zero");
      Assert.equal(title, expected, "The issuer is not created");
      Assert.equal(admin, msg.sender, "The issuer's admin is not created");
   }

   function testCertificateShouldBeCreated() public {
      CertificateStorage certificateStorage = CertificateStorage(DeployedAddresses.CertificateStorage());
      address signer;
      uint created_at; 
      uint disabled_at;  
      bytes32 ipfs_hash; 
      bytes32 id = stringToBytes32("Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp");
      //certificateStorage.createCertificate(id, id, now);
      (signer,created_at,disabled_at,ipfs_hash)=certificateStorage.certificates(id);
      Assert.isNotZero(created_at, 
        "created_at");
      Assert.equal(signer, certificateStorage.owner(), 
        "It should address equals msg.sender");
   }
   
   function testGetCertificate() public {
      CertificateStorage certificateStorage = CertificateStorage(DeployedAddresses.CertificateStorage());
      bytes32 id = stringToBytes32("Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp");
      certificateStorage.createCertificate(id, id, now);
      address addr;
      uint created_at;
      bytes32 ipfs_hash;
      string memory signer_title;
      string memory issuer_title;
      string memory authority_title;
      (addr, created_at, ipfs_hash, signer_title, issuer_title, authority_title) = certificateStorage.getCertificate(id);
      string memory expected_signer_title = "Owner";
      Assert.isNotZero(created_at, 
        "created_at");
      Assert.equal(ipfs_hash, stringToBytes32("Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp"), 
        "It should store the value Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp. ");
      Assert.equal(addr, msg.sender, 
        "It should address equals msg.sender");
      Assert.equal(signer_title, expected_signer_title, 
        "It should store signer_title");
      /*Assert.equal(issuer_title, "", 
        "It should store issuer_title");
      Assert.equal(authority_title, "", 
        "It should store authority_title");*/
   }

   function stringToBytes32(string memory source) public returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function bytes32ToString(bytes32 x) public returns (string memory) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

}
