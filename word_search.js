(params) => {
  var _ = require('underscore.js');
  const dict_results = api.run("this.def_and_syn", params);
  const results = api.run("this.extract_syn", {dict_results})
  let possible_terms =  _.uniq(_.flatten(results.map(res => [res.id, ...res.syns])));
  const thes_results = api.run("this.collegiate_thesaurus_search", params);
  const flat_thes_results = _.flatten(thes_results.map(res => res.syns.slice(0, 3))); 
  possible_terms = _.uniq(possible_terms.concat(flat_thes_results));
  console.log("possible_terms", possible_terms);
  for (let i in possible_terms) {
    const sanitized = possible_terms[i].toLowerCase().replace(" ", "").replace("-", "");
    try {
      const emoj = api.run("this.get_emoji", {name: sanitized})
      if (emoj[0].moji) {
        return emoj[0].moji;
      }
    } catch (e) {
      // nothing, the e exception message is worthless
    }
  }
  
  return [];
}
