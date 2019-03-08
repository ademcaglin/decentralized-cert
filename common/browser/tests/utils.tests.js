//const { getEncryptedArrayBuffer, getDecryptedArrayBuffer } = require('../src/utils');
//const chai = require('chai');
const expect = chai.expect;

describe('get encrypted array buffer', function () {
    it('should be successful', async function () {
        let enc = new TextEncoder();
        let ab = enc.encode("abc");
        let key = await crypto.subtle.digest("SHA-256", ab);
        let encrypted = await getEncryptedArrayBuffer(ab);
        let decrypted = await getDecryptedArrayBuffer(key, encrypted);
        expect("abc").to.equal(new TextDecoder().decode(decrypted));
    });
});