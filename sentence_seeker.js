(params) => {
  var _ = require('underscore.js');
  return _.flatten(api.runBulk(params.sentence.replace(/\b(it|in|an|a|the|from|to|with|of|and|but|so|for|are|is)\b/g, "").split(/[ \/,:;.]+/).map(s => {
    return {
      operation: "this.word_search2",
      parameters: {word: s},
    };
  })))
}