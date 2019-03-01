(params) => {
  const _ = require('underscore.js');
  if (_.isEmpty(params.word)) {
    // sometimes our string parsing is not so good
    return [];
  }
  try {
    const synonyms = api.run("this.get_short_results", {word:params.word});
    const possibleTerms = _.uniq([params.word, ..._.flatten(_.flatten(synonyms).map(s => s.synonyms))])
    console.log(`possibleTerms for '${params.word}'`, possibleTerms);
    return possibleTerms;
  } catch (e) {
    return [];
  }
}
