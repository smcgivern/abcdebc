test('uniqueLetters()', function() {
    equal('hangm', uniqueLetters('Hangman'));
    equal('fobarzqux', uniqueLetters('Foo bar baz quux'));
    equal('ilscream', uniqueLetters("I'll scream"));
});

test('abcdebc() with correct guess', function() {
    equal('Hangman', abcdebc('Abcdebc', 'hangm'));
});

test('abcdebc() with correct guess in wrong case', function() {
    equal('Hangman', abcdebc('Abcdebc', 'HANGM'));
});

test('abcdebc() with partial guess', function() {
    equal('Hanan', abcdebc('Abcdebc', 'han'));
});

test('abcdebc() with no guess', function() {
    equal('', abcdebc('Abcdebc', ''));
    equal("' ", abcdebc("A'bb cdefgh", ''));
});

test('hangman()', function() {
    equal('Abcdebc', hangman('Hangman'));
});

test('hangman() with punctuation', function() {
    equal("A'bb cdefgh", hangman("I'll scream"));
});

test('hangman() with repeated letters', function() {
    equal('Abccbde', hangman('Letters'));
});

test('decrypt()', function() {
    equal('Hangman', decrypt(sjclPassword, 'wc1R0lOf7kJ0uSGec0sd', sjclParams));
});

test('encrypt()', function() {
    equal('wc1R0lOf7kJ0uSGec0sd', encrypt(sjclPassword, 'Hangman', sjclParams));
});

test('remainingLetters()', function() {
    equal('adgltvyz', remainingLetters('The quick brown fox jumps').join(''));
});
