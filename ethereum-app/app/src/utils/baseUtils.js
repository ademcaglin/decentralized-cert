import bs58 from 'bs58';
function ab2base64(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base642ab(base64Str) {
    return Uint8Array.from(atob(base64Str), c => c.charCodeAt(0));
}

function base582hex(base58Str) {
    return "0x" + bs58.decode(base58Str).slice(2).toString('hex');
}

function hex2base58(hexStr) {
    const hashHex = "1220" + hexStr.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
}

function buffer2hex(buffer) {
    let str = Array
        .from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    return "0x" + str;
}


export { ab2base64, base642ab, base582hex, hex2base58, buffer2hex }