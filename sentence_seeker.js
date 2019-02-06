(params) => {
  var _ = require('underscore.js');
  return _.flatten(api.runBulk(params.sentence.replace(/\b(it|in|an|a|the|from|to|with|of|and|but|so|for)\b/g, "").split(/[ \/,]+/).map(s => {
    return {
      operation: "this.word_search",
      parameters: {word: s},
    };
  })))
}