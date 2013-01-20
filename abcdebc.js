var sjclPassword = 'abcdebc',
    sjclParams = {
        'iv': 'GIll1hpIblEjYh1cse7DqQ',
        'v': 1,
        'iter': 1000,
        'ks': 128,
        'ts': 64,
        'mode': 'ccm',
        'adata': '',
        'cipher': 'aes',
        'salt': 'YVGHNC2Tu2M'
    };

function uniqueLetters(string) {
    return string
        .toLowerCase()
        .replace(/[^a-z]/g, '')
        .replace(/./g, function(character, offset, string) {
            return (offset === string.indexOf(character)) ? character : '';
        });
}

function replacer(guess) {
    return function(character, offset, string) {
        var characterCode = character.toUpperCase().charCodeAt(0),
            pos = uniqueLetters(string).indexOf(character.toLowerCase()),
            upperCase = (character === character.toUpperCase()),
            result = ((guess !== false) ? guess[characterCode - 65]
                                        : String.fromCharCode(pos + 65)) || '';

        if (upperCase) { return result.toUpperCase(); }

        return result.toLowerCase();
    };
}

function abcdebc(pattern, guess) {
    return pattern.replace(/[A-z]/g, replacer(guess));
}

function hangman(answer) { return abcdebc(answer, false); }

function encrypt(password, text, params) {
    var decrypted = sjcl.json.decode(sjcl.encrypt(password, text, params));

    return sjcl.codec.base64.fromBits(decrypted['ct'], 1);
}

function decrypt(password, text, params) {
    return sjcl.decrypt(password, sjcl.json.encode({'ct': text}), params);
}

function remainingLetters(skips) {
    var letters = [];

    for (var i = 0; i <= 25; i++) {
        var letter = String.fromCharCode(i + 97);

        if (skips.indexOf(letter) === -1) { letters.push(letter); }
    };

    return letters;
}
