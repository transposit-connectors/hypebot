(params) => {
  var _ = require('underscore.js');
  return _.flatten(api.runBulk(params.sentence.replace(/\b(in|an|a|the|from|to|with)\b/g, "").split(/[ \/,]+/).map(s => {
    return {
      operation: "this.word_search",
      parameters: {word: s},
    };
  })))
}