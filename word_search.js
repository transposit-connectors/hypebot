(params) => {
  var _ = require('underscore.js');
  const dict_results = api.run("this.filtered_def_and_syn", params);
  let possible_terms = [];  
  if (_.isEmpty(dict_results) || _.isEmpty(dict_results[0])) {
    // we have a weird word, the merriam apis are going to give us straight synonyms instead    
    possible_terms = api.run("merriam_webster_dict.collegiate_dictionary_search", params);
  } else {
    const results = api.run("this.extract_syn", {dict_results})
    possible_terms =  _.uniq(_.flatten(results.map(res => [res.id, ...res.syns])));
    const thes_results = api.run("this.collegiate_thesaurus_search", params);
    const flat_thes_results = _.flatten(thes_results.map(res => res.syns.slice(0, 3))); 
    possible_terms = _.uniq(possible_terms.concat(flat_thes_results).map(r => r.toLowerCase()));
  }

  console.log("possible_terms for ", params.word, possible_terms);
  /*
  for (let i in possible_terms) {
    const sanitized = possible_terms[i].replace(" ", "").replace("-", "");
    try {
      const emoj = api.run("this.get_emoji", {name: sanitized})
      if (emoj[0].moji) {
        console.log(`found :${emoj[0].code}: for ${sanitized}`);
        return emoj[0].moji;
      }
    } catch (e) {
      // nothing, the e exception message is worthless
    }
  }*/
  
  for(let j in possible_terms) {
    const res = api.run("this.search_emoji", {word: possible_terms[j]});
    for (let i in res) {
      const { moji, code } = res[i].emoji;
      if (moji && code.length <= possible_terms[j].length * 2) {
        console.log(`found :${res[i].emoji.code}: for search '${possible_terms[j]}' for ${params.word}`);
        return res[i].emoji.moji;
      }
    };
  }
  return [];
}
