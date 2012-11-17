test('abcdebc() with correct guess', function() {
    equal('Hangman', abcdebc('Abcdebc', 'hangm'));
});

test('abcdebc() with partial guess', function() {
    equal('Hanan', abcdebc('Abcdebc', 'han'));
});

test('abcdebc() with no guess', function() {
    equal('', abcdebc('Abcdebc', ''));
    equal("' ", abcdebc("A'bb cdeff", ''));
});
