async function getEncryptedArrayBuffer(arrayBuffer) {
    let hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
    let key = await crypto.subtle.importKey("raw", hash, "aes-ctr", false, ["encrypt"]);
    let iv = hash.slice(0, 16);
    let encrypted = await crypto.subtle.encrypt({ name: "aes-ctr", counter: iv, length: 128 }, key, arrayBuffer);
    return { encrypted };
}

async function getDecryptedArrayBuffer(hash, encrpted) {
    let key = await crypto.subtle.importKey("raw", hash, "aes-ctr", false, ["decrypt"]);
    let iv = hash.slice(0, 16);
    let content = await crypto.subtle.decrypt({ name: "aes-ctr", counter: iv, length: 128 }, key, encrpted);
    return content;
}

export { getEncryptedArrayBuffer, getDecryptedArrayBuffer }