pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CertificateStorage.sol";

contract TestCertificateStorage {

  function testItStoresAValue() public {
    CertificateStorage certificateStorage = CertificateStorage(DeployedAddresses.CertificateStorage());
    bytes32 id = stringToBytes32("Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp");
    certificateStorage.createCertificate(id, 'QmZz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp');
    
    address addr;
    uint created_at;
    string memory ipfs_addr;
    (addr, created_at, ipfs_addr) = certificateStorage.getCertificate(id);
    Assert.equal(ipfs_addr, "QmZz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp", "It should store the value 89.");
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
}
