const bs58 =require('bs58');
const CertificateStorage = artifacts.require("CertificateStorage");

contract("CertificateStorage", accounts => {
  let certificateStorageInstance;

  beforeEach(async () => {
    certificateStorageInstance = await CertificateStorage.new();
  });
  it("...should set owner.", async () => {
    const owner = await certificateStorageInstance.owner.call();
    assert.equal(owner, accounts[0], "The issuer's owner is not setted.");
  });

  it("...should store the issuer.", async () => {
    let title = "Decentralized Certificate Issuer";
    let date_of_creation = Math.floor(Date.now() / 1000);
    let admin = accounts[1];
    let certificate_type = web3.utils.padRight(web3.utils.asciiToHex("GENERAL"), 64);
    await certificateStorageInstance.createIssuer(title, certificate_type, admin,
       date_of_creation, { from: accounts[0] });
    let key = web3.utils.keccak256(title);
    const issuer = await certificateStorageInstance.issuers.call(key);
    assert.equal(issuer.admin, accounts[1], "The issuer is not created.");
    assert.equal(issuer.dateOfCreation, date_of_creation, "The issuer is not created.");
    assert.equal(issuer.certificateType, certificate_type, "The issuer is not created.");
    const issuerKey = await certificateStorageInstance.issuerKeys.call(1);
    assert.equal(issuerKey, key, "issuer key is not added");
  });

  it("...only owner can create an issuer.", async () => {
    let title = "Decentralized Certificate Issuer";
    let date_of_creation = Math.floor(Date.now() / 1000);
    let admin = accounts[1];
    let certificate_type = web3.utils.padRight(web3.utils.asciiToHex("GENERAL"), 64);
    let message = 'The message sender does not have permission';
    try {
      await certificateStorageInstance.createIssuer(title, certificate_type, admin,
        date_of_creation, { from: accounts[2] });
    } catch (e) {
      assert.include(e.message, message, message);
    }
  });

  it("...should store the signer.", async () => {
    let issuerKey = await createAnIssuer("Decentralized Certificate Issuer");
    let date_of_creation = Math.floor(Date.now() / 1000);
    await certificateStorageInstance.createSigner(accounts[1], date_of_creation,
       issuerKey, { from: accounts[1] });
    const signer = await certificateStorageInstance.signers.call(accounts[1]);
    assert.equal(signer.dateOfCreation, date_of_creation, "The signer is not created.");
    let signerKey = await certificateStorageInstance.getIssuerSignerKeys(issuerKey);
    assert.equal(signerKey, accounts[1], "The issuer does not contain signer");
  });

  it("...should store the cer.", async () => {
    let issuerKey = await createAnIssuer("Decentralized Certificate Issuer");
    let signerKey = await createASigner(issuerKey, accounts[1]);
    let key = web3.utils.randomHex(32);
    let ipfs_hash_str = "QmZL3TRXMCczQMVowo6m7xrucz63CnhcdfxRPyG8nc4VSE";
    let ipfs_hash = "0x" + bs58.decode(ipfs_hash_str).slice(2).toString('hex');
    let date_of_creation = Math.floor(Date.now() / 1000);
    await certificateStorageInstance.createCertificate(key, ipfs_hash,
       date_of_creation, { from: accounts[1] });

    const cer = await certificateStorageInstance.certificates.call(key);
    assert.equal(cer.signer, signerKey, "The certificate is not created.");
    assert.equal(getIpfsHashFromBytes32(cer.ipfsHash), ipfs_hash_str, "The certificate is not created.");

    let x = await certificateStorageInstance.getCertificate(key);
    console.log(x);
  });
  function getIpfsHashFromBytes32(bytes32Hex) {
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
  }
  async function createAnIssuer(title) {
    let date_of_creation = Math.floor(Date.now() / 1000);
    let admin = accounts[1];
    let certificate_type = web3.utils.padRight(web3.utils.asciiToHex("GENERAL"), 64);
    await certificateStorageInstance.createIssuer(title, certificate_type, admin,
       date_of_creation, { from: accounts[0] });
    let key = web3.utils.keccak256(title);
    return key;
  }

  async function createASigner(issuerKey, signerKey) {
    let date_of_creation = Math.floor(Date.now() / 1000);
    await certificateStorageInstance.createSigner(signerKey, date_of_creation,
       issuerKey, { from: accounts[1] });
    return signerKey;
  }


  /*
      const issuer = await certificateStorageInstance.issuers.call(web3.utils.fromAscii("DECENTRALIZED_ISSUER"));
    assert.equal(issuer.title, "Decentralized Certificate Issuer", "The issuer is not created.");
  it("...should store the cer.", async () => {
    const certificateStorageInstance = await CertificateStorage.deployed();
    let id = web3.utils.randomHex(32);
    let ipfs_hash = web3.utils.randomHex(32);
    let date_of_creation = Math.floor(Date.now() / 1000);
    await certificateStorageInstance.createCertificate(id, ipfs_hash, date_of_creation, { from: accounts[0] });

    const cer2 = await certificateStorageInstance.certificates.call(id);
    assert.equal(cer2.signer, accounts[0], "The certificate is not created.");
    assert.equal(cer2.ipfsHash, ipfs_hash , "The certificate is not created.");
  });*/
});
