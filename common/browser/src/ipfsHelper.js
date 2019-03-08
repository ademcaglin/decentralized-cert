async function addToIpfs(ipfs, arrayBuffer){
    let encrypted = await getEncryptedFile(arrayBuffer);
    let buf = ipfs.types.Buffer.from(encrypted);
    return new Promise((resolve, reject) => {
        ipfs.add(buf, (err, result) => {
            if (err) {
                reject(new DOMException(err));
            };
            resolve(result[0].hash);
        });      
    });   
} 

async function getFromIpfs(ipfs, ipfs_hash, hash){ 
    return new Promise((resolve, reject) => {
        ipfs.get(ipfs_hash, (err, files) => {
            if (err) {
                reject(new DOMException(err));
            };
            //decryptFile(files[0].content, x.hash).then(dec=>console.log(dec)); 
            resolve(result[0].hash);
        });      
    });   
} 


