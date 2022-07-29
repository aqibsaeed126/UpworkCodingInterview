/* An application that will provide for a given input of file name/text:
1. Top 5 most common words (with > 3 characters)
2. Top 5 longest words
3. Top 5 least common words
4. Total number of letters
5. Number of total special chars . & , */

// obj = { 'hello': 2 }
// lengthObj = {4: ['hello', 'game', ]}
// length array -> [3,4,5,19, 18]

const FILE_PATH = "https://raw.githubusercontent.com/timguoqk/cloze/master/books/Fahrenheit%20451%20-%20Ray%20Bradbury.txt";

function parseData(data) {

  let wordCountObj = {};
  let wordLengthObj = {};

  let totalSpecialCharacterCount = 0;
  let totalLetterCharacterCount = 0;
  
	data = data.replace(/(\r\n|\n|\r)/gm, " ");
  data = data.replace('  ', ' ');
  
  let splittedWords = data.split(' ');
  
  for(let i=0; i<splittedWords.length; i++) {
  	let beforeRemovingSpecialCh = splittedWords[i].length;
    splittedWords[i] = splittedWords[i].replace(/[^a-zA-Z ]/g, "");
    
    // total characters
    totalLetterCharacterCount += splittedWords[i].length;
    
    // total special characters
    if (beforeRemovingSpecialCh !== splittedWords[i].length) {
    	totalSpecialCharacterCount += (beforeRemovingSpecialCh - splittedWords[i].length);
    }
    
    let currentWord = splittedWords[i];
    let CurrentWordLength = splittedWords[i].length;
    let lengthArray = [];
    
    // Update Word Count Obj
    if (!wordCountObj[currentWord]) {
    	wordCountObj[currentWord] = 1;
    } else {
    	wordCountObj[currentWord]++;
    }
    
    // Update Length Count Object
    if (!wordLengthObj[CurrentWordLength]) {
    	wordLengthObj[CurrentWordLength] = [currentWord];
      
      // length array
      lengthArray.push(CurrentWordLength);
      
    } else {
    	wordLengthObj[CurrentWordLength].push(currentWord);
    }
    
    // length Array Sort - descending
    lengthArray.sort(function(a,b){return a - b});
    
    console.log(lengthArray[0]);
  }
  
  
  
}



function getResultTextFile() {
	 fetch(FILE_PATH)
   .then(response => {
       return response.text();
   })
   .then(data => {
       let result = parseData(data);
   })
   .catch(function () {
       this.dataError = true;
   })

}


let result = getResultTextFile();
