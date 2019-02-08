(params) => {
  var _ = require('underscore.js');
  let emoji_list = api.run("this.emoji_shortcodes");

  emoji_list = emoji_list.concat(Object.keys(api.run("this.list_emoji")[0].emoji));
  let results = [];
  
  return _.flatten(api.runBulk(params.sentence.replace(/\b(it|in|an|a|the|from|to|with|of|and|but|so|for|are|is|be|being|was|that|this)\b/g, "").split(/[ \/,:;.?!<>]+/).map(s => {
    return {
      operation: "this.word_search2",
      parameters: {word: s},
    };
  })).map(possible_terms => {
    let results = []
    for(let j in possible_terms) {
      const sanitized = possible_terms[j].replace(/[ ]+/g, "");    
      console.log(sanitized)
      const res = _.filter(emoji_list, (code) => sanitized === code || _.indexOf(code.split(/[_-]+/), sanitized) >= 0)

      for (let i in res) {
        if (res[i] && res[i].length <= sanitized.length * 2) {
          console.log(`found :${res[i]}: for search '${sanitized}' for ${possible_terms[0]}`);
          results.push(res[i])
        }
      }
    }
    return results;
  }));
}