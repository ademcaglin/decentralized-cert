import { getEncryptedArrayBuffer, getDecryptedArrayBuffer } from './utils';

async function addToIpfs(ipfs, arrayBuffer){
    let data = await getEncryptedArrayBuffer(arrayBuffer);
    let buf = ipfs.types.Buffer.from(data.encrypted);
    return new Promise((resolve, reject) => {
        ipfs.add(buf, (err, result) => {
            if (err) {
                reject(new DOMException(err));
            };
            resolve({ hash: data.hash, ipfs_hash: result[0].hash });
        });      
    });   
} 

async function getFromIpfs(ipfs, ipfs_hash, hash){ 
    return new Promise((resolve, reject) => {
        ipfs.get(ipfs_hash, (err, files) => {
            if (err) {
                console.log(ipfs_hash);
                console.log(err);
                reject(new DOMException(err));
            };
            let encrypted = files[0].content;
            getDecryptedArrayBuffer(hash, encrypted).then(content => resolve(content));
        });      
    });   
} 

export { addToIpfs, getFromIpfs };

