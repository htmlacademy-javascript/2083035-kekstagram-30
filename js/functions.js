
const checkStringLength = (string, length) => string.length <= length;

(checkStringLength('проверяемая строка', 20))

const isPalindrome = (string) => {
    const testString = string
        .toLowerCase()
        .replaceAll(' ', '');

    let reverseString = '';
    for (let i = testString.length - 1; i >= 0; i--) {
        reverseString += testString.at(i);
    }
    return testString === reverseString;
}

isPalindrome('ДовОд');

const exstractNumber = (string) => {
    if (typeof string === 'number') {
      return string;
    }
  
    let result = '';
    for (let i = 0; i <= string.length - 1; i++) {
      if (isNaN(parseInt(string.at(i), 10))) {
        continue;
      }
  
      result += string.at(i);
    }
    return parseInt(result, 10);
  };
  
  exstractNumber('2023 год'); // 2023