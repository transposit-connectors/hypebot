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

  console.log(`possible_terms for '${params.word}'`, possible_terms);
  
  const emoji_list = api.run("this.emoji_shortcodes");
  let results = [];
  
  for(let j in possible_terms) {
    const sanitized = possible_terms[j].replace(/[ -]+/g, "");    
    const res = _.filter(emoji_list, (code) => _.contains(code.split(/[_-]+/), sanitized))

    for (let i in res) {
      if (res[i] && res[i].length <= sanitized.length * 2) {
        console.log(`found :${res[i]}: for search '${sanitized}' for ${params.word}`);
        results.push(res[i])
      }
    };
  }
  return results;
}
