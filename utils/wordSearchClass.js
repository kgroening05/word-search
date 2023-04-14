class WordSearch {
  #grid
  #parsedGrid = {}
  #foundWords = {}

  constructor(grid) {
    this.#grid = grid;
    this.#parseGrid(grid)
  }

  #parseGrid(grid) {
    for (let row = 1; row <= grid.length; row++) {
      const rowLine = grid[row - 1];
      for (let column = 1; column <= rowLine.length; column++) {
        const letter = rowLine[column - 1];
        if (!this.#parsedGrid[letter]) {
          this.#parsedGrid[letter] = []
        }
        this.#parsedGrid[letter].push([row, column])
      }
    }
  }

  find(targetArray) {
    for (let index = 0; index < targetArray.length; index++) {
      // get first letter locations
      const word = targetArray[index]; // get the first word from the list of words to find
      //console.log({ word })
      this.#foundWords[word] = this.#wordSearch(word); // search for the word
    }
    return this.#foundWords
  }

  #wordSearch(word) {
    const grid = this.#grid
    const coordObj = {}; // will look like: {start:[x,y],end:[a,b]}
    const firstLetter = word[0] // get the first letter of the word
    const firstLetterCoordArray = this.#parsedGrid[firstLetter] ?? null; // get the possible starting coordinates
    if (!firstLetterCoordArray) { return undefined } // if there aren't any coordinates found, return
    for (let index = 0; index < firstLetterCoordArray.length; index++) { // for each of the possible starting coordinates
      const firstLetterCoord = this.#convertToZeroIndex(firstLetterCoordArray[index])
      const lettersFound = checkRestOfWord([firstLetterCoord]) // check if the rest of the letters are present around the starting coordinate
      if (!lettersFound) { continue }
      //console.log({lettersFound})
      const wordLength = word.length
      if (lettersFound.length === wordLength) {
        coordObj.start = this.#convertToOneIndex(lettersFound[0])
        coordObj.end = this.#convertToOneIndex(lettersFound[wordLength - 1])
        return coordObj
      }
    }
    return undefined

    // find matching surrounding second letters, then search in each direction if a second letter found
    function checkRestOfWord(coordArray) {
      const surroundingCoords = getSurroundingCoords(coordArray[0])
      for (let i = 0; i < surroundingCoords.length; i++) {
        const coord = surroundingCoords[i];
        const [x, y] = coord;
        const letterInPuzzle = grid?.[x]?.[y] ?? null
        if (!letterInPuzzle) { continue }
        const nextLetter = word[coordArray.length] ?? null
        //console.log({letterInPuzzle, nextLetter})
        if (!nextLetter) { return }
        if (letterInPuzzle === nextLetter) {
          coordArray.push(coord)
          findInlineLetters(coordArray)
          if (coordArray.length == word.length) {
            return coordArray
          }
        }
      }
    }

    // find the next letter going in the same direction
    function findInlineLetters(coordArray) {
      const nextLetter = word[coordArray.length] ?? null
      if (!nextLetter) { return coordArray }
      const lastCoord = coordArray[coordArray.length - 1]
      const previousCoord = coordArray[coordArray.length - 2]
      const [lastX, lastY] = lastCoord;
      const [prevX, prevY] = previousCoord;
      const [nextX, nextY] = [(lastX - prevX) + lastX, (lastY - prevY) + lastY]
      //console.log({nextLetter,lastCoord,previousCoord,nextX,nextY,})
      const nextCoordToCheck = grid?.[nextX]?.[nextY] ?? null
      if (!nextCoordToCheck) { return null }
      if (grid[nextX][nextY] === nextLetter) {
        coordArray.push([nextX, nextY])
        return findInlineLetters(coordArray)
      } else {
        coordArray.pop()
      }
    }

    function getSurroundingCoords(coord) {
      const [x, y] = coord;
      return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
        [x + 1, y + 1],
        [x + 1, y - 1],
        [x - 1, y + 1],
        [x - 1, y - 1],
      ]
    }
  }

  #convertToZeroIndex(coord) {
    const [x, y] = coord
    return [x - 1, y - 1]
  }

  #convertToOneIndex(coord) {
    const [x, y] = coord
    return [x + 1, y + 1]
  }
}

module.exports = WordSearch