const axios = require('axios');
const crypto = require('crypto');

module.exports.getCertificateDataFromUrl = async function (url) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer'
        });
        return getCertificateData(response.data);

    } catch (error) {
        console.log(error);
    }
}

const getCertificateData = (buffer) => {
    const hash = crypto.createHash('sha256')
        .update(buffer)
        .digest();

    const twice_hash = crypto.createHash('sha256')
        .update(hash)
        .digest();

    const iv = hash.slice(0, 16);
    const cipher = crypto.createCipheriv("aes-256-ctr", hash, iv);
    let encrypted = cipher.update(buffer, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return {
        hash: hash.toString('base64'),
        encrypted_file: encrypted,
        content: buffer.toString('base64'),
        twice_hash: twice_hash.toString('base64')
    };
}