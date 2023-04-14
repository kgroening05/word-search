const WordSearch = require('./wordSearchClass');

function wordSearchHandler(req, res, next) {
    const [puzzleGrid, targets] = parseFormInputs(req.body)
    const  puzzle = new WordSearch(puzzleGrid)
    const resultsArray = puzzle.find(targets)
    console.log({results:resultsArray['BULB']})
    next()
}

function parseFormInputs(body){
    const rawGrid = String.raw`${body.wordsearch}`.trim().toUpperCase()
    const rawTargets = body['target-words'].toUpperCase()
    const puzzleSeparator = String.raw`\r\n`
    const targetSeparator = ' '
    const grid = rawGrid.split(/\r\n/)
    const targets = rawTargets.split(targetSeparator)
    return [grid, targets]
}

module.exports = wordSearchHandler;
