function ab2base64(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base642ab(base64Str) {
    return Uint8Array.from(atob(base64Str), c => c.charCodeAt(0));
}

function bufferToHex(buffer) {
    return Array
        .from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

const readUploadedFileAsArrayBuffer = inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsArrayBuffer(inputFile);
    });
};

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

async function getEncryptedArrayBuffer(arrayBuffer){
    let hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
    let key = await crypto.subtle.importKey("raw", hash, "aes-ctr", false, ["encrypt"]);
    let iv = hash.slice(0, 16);
    let encrypted = await crypto.subtle.encrypt({name: "aes-ctr", counter: iv, length: 128}, key, arrayBuffer);
    return {encrypted: encrypted, hash: hash};
}

async function getDecryptedArrayBuffer(hash, encrpted){
    let key = await crypto.subtle.importKey("raw", hash, "aes-ctr", false, ["decrypt"]);
    let iv = hash.slice(0, 16);
    let content = await crypto.subtle.decrypt({ name: "aes-ctr", counter: iv, length: 128 }, key, encrpted);
    return content;
}

export { ab2base64, base642ab, bufferToHex, readUploadedFileAsArrayBuffer, toArrayBuffer, getEncryptedArrayBuffer, getDecryptedArrayBuffer };