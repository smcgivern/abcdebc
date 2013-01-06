function replacer(guess) {
    return function(character) {
        var characterCode = character.toUpperCase().charCodeAt(0),
            upperCase = (character === character.toUpperCase()),
            result = (guess[characterCode - 65] || '');

        if (upperCase) { return result.toUpperCase(); }

        return result.toLowerCase();
    };
}

function abcdebc(pattern, guess) {
    return pattern.replace(/[A-z]/g, replacer(guess));
}
