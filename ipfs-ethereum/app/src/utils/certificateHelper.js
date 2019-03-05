function bufferToHex (buffer) {
    return Array
        .from (new Uint8Array (buffer))
        .map (b => b.toString (16).padStart (2, "0"))
        .join ("");
}

function ab2base64(buf){
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base642ab(base64Str){
    return Uint8Array.from(atob(base64Str), c => c.charCodeAt(0));
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}


async function getCertificateData(buffer){
    let hash = await crypto.subtle.digest("SHA-256", buffer);
    let hash2 = await crypto.subtle.digest("SHA-256", hash);
    let key = await crypto.subtle.importKey("raw", hash, "aes-ctr", false, ["encrypt"]);
    let iv = hash.slice(0, 16);
    let encrypted = await crypto.subtle.encrypt({name: "aes-ctr", counter: iv, length: 128}, key, buffer);
    return {
        hash: hash,
        encrypted: encrypted,
        hash2: hash2
    };
}

export {getCertificateData, str2ab,ab2str, bufferToHex};