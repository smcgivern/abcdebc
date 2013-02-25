var sounds = {},
    demoGames = [
        'wc1R0lOf7kJ0uSGec0sd',
        '3dtQV75n84jCUDBpxYAyL6RqpRxjVyIRntwxo4WzpM0Fph055N9URblu',
        '3cRalU+L6cvKHz9ry5klI+JxtU5sR63hdI9+tMCi9tYap/lbZ7LTeiToE/ZM9pkX9LBh'
    ];

function init() {
    ['letter', 'won', 'lost'].forEach(function(sound) {
        sounds[sound] = new Audio(sound + '.wav');
    });

    demoGames.forEach(function(demoGame, i) {
        var parent = document.getElementById('demo-games'),
            link = document.createElement('span');

        link.innerHTML = i + 1;
        link.className = 'click';
        link.onclick = function() { setHash(demoGame); };

        parent.appendChild(link);

        if (i !== demoGames.length - 1) {
            parent.appendChild(document.createTextNode(' '));
        }
    });

    document.getElementById('reload').onclick = window.onhashchange;
    document.getElementById('create-game').onclick = function () {
        var answer = document.getElementById('answer').value;

        setHash(encrypt(sjclPassword, answer, sjclParams));
    };

    if (window.location.hash !== '') { window.onhashchange(); }
}

function setHash(hash) {
    window.location.hash = '#' + encodeURIComponent(hash);
}

function load(encryptedAnswer, password, params) {
    var answer, uniques;

    try {
        answer = decrypt(password, encryptedAnswer, params);
    } catch(e) {
        return error();
    }

    uniques = uniqueLetters(answer);

    document.getElementById('lost-game').className = 'hidden';
    document.getElementById('won-game').className = 'hidden';
    document.getElementById('error').className = 'hidden';
    document.getElementById('remaining-letters').className = '';
    document.getElementById('word').className = '';

    toLetters(function(e, l) {
        e.className = (uniques.indexOf(l) === -1) ? 'hidden' : '';
    });

    return play(answer, '');
}

function endGame(result) {
    playSound(result);

    document.getElementById(result + '-game').className = '';

    toLetters(function(element) { element.onclick = null; });
}

function error(message) {
    document.getElementById('error').className = '';
    document.getElementById('lost-game').className = 'hidden';
    document.getElementById('won-game').className = 'hidden';
    document.getElementById('remaining-letters').className = 'hidden';
    document.getElementById('word').className = 'hidden';
}

function play(answer, guess) {
    var pattern = hangman(answer),
        result = abcdebc(pattern, guess),
        uniques = (guess === undefined) ? '' : uniqueLetters(guess);

    document.getElementById('word').innerHTML = result + '&nbsp;';

    if (result.length === answer.length) {
        return (result === answer) ? endGame('won') : endGame('lost');
    }

    if (guess.length > 0 ) { playSound('letter'); }

    toLetters(function(element, letter) {
        if (uniques.indexOf(letter) === -1) {
            element.onclick = function() {
                this.className = 'guessed';
                this.onclick = null;

                return play(answer, guess + letter);
            };
        }
    });

    return result;
}

function playSound(sound) {
    if (document.getElementById('play-sounds').checked) {
        sounds[sound].play();
    }
}

function toLetters(func) {
    var i,
        letter,
        letters = document
            .getElementById('remaining-letters')
            .getElementsByTagName('span');

    for (i = 0; i < letters.length; i++) {
        letter = letters[i];

        func(letter, letter.id.slice(-1));
    }
}

window.onhashchange = function() {
    var hash = window.location.hash.slice(1);

    load(decodeURIComponent(hash), sjclPassword, sjclParams);
};

window.onload = init;
