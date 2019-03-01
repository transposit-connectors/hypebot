(params) => {
  const _ = require('underscore.js');
  const synonyms = api.run("this.get_short_results", {word:params.word});
  const possibleTerms = _.uniq([params.word, ..._.flatten(_.flatten(synonyms).map(s => s.synonyms))])
  console.log(`possibleTerms for '${params.word}'`, possibleTerms);
  return possibleTerms;
}
