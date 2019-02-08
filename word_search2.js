(params) => {
  var _ = require('underscore.js');
  
  if (_.isEmpty(params.word)) {
    return [];
  }
  
  const dict_results = api.run("this.filtered_def_and_syn", params);
  let possible_terms = [];  
  if (_.isEmpty(dict_results) || _.isEmpty(dict_results[0])) {
    // we have a weird word, the merriam apis are going to give us straight synonyms instead    
    possible_terms = api.run("merriam_webster_dict.collegiate_dictionary_search", params);
  } else {
    const results = api.run("this.extract_syn", {dict_results})
    possible_terms =  _.uniq(_.flatten(results.map(res => [res.id])));
    const thes_results = api.run("this.collegiate_thesaurus_search", params);
    const flat_thes_results = _.flatten(thes_results.slice(0,3).map(res => res.syns.slice(0, 1)));
    possible_terms = _.uniq(possible_terms.concat(flat_thes_results).map(r => r.toLowerCase()));
  }

  possible_terms.unshift(params.word);
  possible_terms = _.uniq(_.filter(possible_terms, (t) => typeof t == "string")).splice(0,5);
  
  console.log(`possible_terms for '${params.word}'`, possible_terms);
  
  return possible_terms;
}
