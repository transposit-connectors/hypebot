(params) => {
  var _ = require('underscore.js');
  const dict_results = api.run("this.def_and_syn", params);
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
  for (let i in possible_terms) {
    const sanitized = possible_terms[i].replace(" ", "").replace("-", "");
    try {
      const emoj = api.run("this.get_emoji", {name: sanitized})
      if (emoj[0].moji) {
        return emoj[0].moji;
      }
    } catch (e) {
      // nothing, the e exception message is worthless
    }
  }
  const res = api.run("this.search_emoji", params);
  for (let i in res) {
    if (res[i].emoji.moji) {
      return res[i].emoji.moji;
    }
  };
  return [];
}
