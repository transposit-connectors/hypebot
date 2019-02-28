(params) => {
  const _ = require('underscore.js');
  const boringWordsFinder = /\b(it|in|an|on|in|a|the|from|to|with|of|and|but|so|for|are|is|be|being|was|that|this)\b/g;
  const wordSeparators = /[ \/,:;.?!<>"']+/g
  // a list of all emoji shortcodes concat with any custom slack shortcodes
  const emojiList = api.run("this.emoji_shortcodes").concat(Object.keys(api.run("this.list_emoji")[0].emoji));

  let results = [];
  const wordsInASentence = params.sentence.replace(boringWordsFinder, "").split(wordSeparators);
  // search for every word in the sentence in parallel
  return _.flatten(api.runBulk(wordsInASentence.map(word => ({
      operation: "this.word_search2",
      parameters: {word: word},
    })
  )).map(possibleTerms => {
    let results = []
    for(let termIdx in possibleTerms) {
      const sanitized = possibleTerms[termIdx].replace(/[ ]+/g, "");
      const matchingShortcodes = _.filter(emojiList, (code) => sanitized === code || _.indexOf(code.split(/[_-]+/g), sanitized) >= 0)
      for (let scIdx in matchingShortcodes) {
        if (matchingShortcodes[scIdx] && matchingShortcodes[scIdx].length <= sanitized.length * 3) {
          console.log(`found :${matchingShortcodes[scIdx]}: for search '${sanitized}' for ${possibleTerms[0]}`);
          results.push(matchingShortcodes[scIdx])
        }
      }
      if (results.length > params.hype_level) {
        break;
      }
    }
    // this is a terrible way to sort, but the result array should not be that large.
    return results.sort(() => .5 - Math.random()).slice(0, params.hype_level);
  }));
}