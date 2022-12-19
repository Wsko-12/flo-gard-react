export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const upCaseLetters = new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 65));
const lowCaseLetters = new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 97));
const numbers = new Array(10).fill(0).map((_, i) => String.fromCharCode(i + 48));
const mixed = [...upCaseLetters, ...lowCaseLetters, ...numbers];
export const generateGameObjectId = (length = 16) => {
  const mixedLength = mixed.length;
  let id = 'GameObject_';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * mixedLength);
    const char = mixed[randomIndex];
    id += char;
  }

  return id;
};
