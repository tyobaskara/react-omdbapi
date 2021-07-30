const words = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'];

const sortString = (word) => {
  let strArray = word.split('');

  for (let i = 0; i < strArray.length; i++) {
    for (let y = 0; y < strArray.length; y++) {
      let temp = strArray[y+1];

      if (!temp) { continue; }

      if (strArray[y] > strArray[y+1]) {
        strArray[y+1] = strArray[y];
        strArray[y] = temp;
      }
    }
  }

  return strArray.join('');
};

const findAnagram = (data, keyword, callback) => {
  for (let i = 0; i < data.length; i++) {
    const sortedString = sortString(data[i]);
    
    if (sortedString === keyword) { 
      callback(i, data[i]);
     }
  }
};

const getAnagramList = (data) => {
  let result = [];
  let temp = [];
  let anagramListOfIndex = [];

  for (let i = 0; i < data.length; i++) {
    temp = [];
    const keyword = sortString(data[i]);

    findAnagram(data, keyword, (index, anagram) => {
      if (!anagramListOfIndex.includes(index)) {
        anagramListOfIndex.push(index);
        temp.push(anagram);
      }
    });

    if (temp.length) {
      result.push(temp);
    }
  }

  return result;
};

getAnagramList(words);