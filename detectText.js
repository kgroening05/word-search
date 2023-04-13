const tesseract = require('tesseract.js')

function detectText (req, res, next) {
  tesseract.recognize(
    './images/word-search-46-puzzle.png',
    'eng',
    { logger: m => console.log(m) }
    )
    .then(({ data: { text } }) => {
    console.log(text);
    })
  next();
}

module.exports = detectText