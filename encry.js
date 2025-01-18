let publicKey, privateKey;

// إنشاء زوج المفاتيح
async function generateKeys() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );

    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
    console.log("تم إنشاء المفاتيح بنجاح!");
}

// تشفير الرسالة
async function encryptMessage() {
    const message = document.getElementById("message").value;
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);

    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encodedMessage
    );

    document.getElementById("encryptedMessage").value = btoa(
        String.fromCharCode(...new Uint8Array(encrypted))
    );
}

// فك التشفير
async function decryptMessage() {
    const encryptedMessage = document.getElementById("encryptedMessage").value;
    const encryptedData = Uint8Array.from(atob(encryptedMessage), (c) =>
        c.charCodeAt(0)
    );

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedData
    );

    const decoder = new TextDecoder();
    const originalMessage = decoder.decode(decrypted);
    document.getElementById("decryptedMessage").value = originalMessage;
}

// توليد المفاتيح عند تحميل الصفحة
generateKeys();