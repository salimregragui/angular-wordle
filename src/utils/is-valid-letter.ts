export const isValidLetter = (letter: string): boolean => {
  const validLetters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'enter',
    'backspace',
  ];

  if (validLetters.includes(letter.toLowerCase())) return true;

  return false;
};
