pragma solidity >=0.4.21 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CertificateStorage.sol";

contract TestCertificateStorage {

  function testItStoresAValue() public {
    CertificateStorage certificateStorage = CertificateStorage(DeployedAddresses.CertificateStorage());
    bytes32 id = stringToBytes32("Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp");
    certificateStorage.createCertificate(id, stringToBytes2('Qm'), stringToBytes32('Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp'));
    
    address addr;
    uint created_at;
    bytes32 ipfs_hash;
    bytes2 ipfs_alg;
    (addr, created_at, ipfs_hash, ipfs_alg) = certificateStorage.getCertificate(id);
    Assert.equal(ipfs_hash, stringToBytes32("Zz8svcnkgxuRxS3c8tb7BLEdrNQ9BCLmahFAgrtrWnEp"), "It should store the value 89.");
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
function stringToBytes2(string memory source) public returns (bytes2 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 2))
    }
}
}
