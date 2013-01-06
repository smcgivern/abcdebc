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
