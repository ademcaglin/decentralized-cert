const { getCertificateDataFromUrl } = require('../src/certificateHelper')
const chai = require('chai');
const crypto = require('crypto');
const expect = chai.expect;

describe('get certificate data', function () {
  it('should be successful', async function () {
    let r = await getCertificateDataFromUrl('http://www.africau.edu/images/default/sample.pdf');
    let hash = 'jezIVxlG1M1woCSUngM6KipUN3/p8cG5RMIPnuEanlE=';
    let hashBuffer = Buffer.from(hash, 'base64');
    expect(r.hash).to.equal(hash);
    expect(r.twice_hash).to.equal('k+Z7L/IUDDo/mV/55TbEy1i130gt001Ho5zzM3OT734=');
    let iv = Buffer.from(hashBuffer).slice(0, 16);
    let decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(hashBuffer), iv);

    let decrypted = Buffer.concat([
      decipher.update(Buffer.from(r.encrypted_file, 'base64')),
      decipher.final()
    ]);
    expect(r.content).to.equal(decrypted.toString('base64'));
  });
});