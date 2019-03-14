import ipfsClient from 'ipfs-http-client';
const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });

ipfs.add(data, (err, result) => {
    if (err) {
        throw err
    }
    console.log(result);
});
