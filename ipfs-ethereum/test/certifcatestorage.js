const CertificateStorage = artifacts.require("CertificateStorage");

contract("CertificateStorage", accounts => {
  it("...should store the issuer.", async () => {
    const certificateStorageInstance = await CertificateStorage.deployed();
    const issuer = await certificateStorageInstance.issuers.call(web3.utils.fromAscii("DECENTRALIZED_ISSUER"));
    assert.equal(issuer.title, "Decentralized Certificate Issuer", "The title is not correct.");
  });
  
  it("...should store the cer.", async () => {
    const certificateStorageInstance = await CertificateStorage.deployed();
    let id = web3.utils.asciiToHex("aaaaa");
    let ipfs_hash = web3.utils.randomHex(32);
    let created_at = Math.floor(Date.now() / 1000);
    console.log(created_at);
    await certificateStorageInstance.createCertificate(id, ipfs_hash, created_at, { from: accounts[0] });

    const cer2 = await certificateStorageInstance.certificates.call(web3.utils.asciiToHex('aaaaa'));
    console.log(cer2.created_at);
    assert.equal(cer2.signer, accounts[0], "ipfs_hash is not correct.");
    assert.equal(cer2.ipfs_hash, ipfs_hash , "ipfs_hash is not correct.");
  });
});
