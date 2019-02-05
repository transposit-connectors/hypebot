(params) => {
  var _ = require('underscore.js');
  const dict_results = api.run("this.def_and_syn", params);
  const results = api.run("this.extract_syn", {dict_results})
  const possible_terms =  _.uniq(_.flatten(results.map(res => [res.id, ...res.syns])));
  console.log("possible_terms", possible_terms);
  for (let i in possible_terms) {
    try {
      const emoj = api.run("this.get_emoji", {name: possible_terms[i]})
      if (emoj[0].moji) {
        return emoj[0].moji;
      }
    } catch (e) {
      // nothing, the e exception message is worthless
    }
  }
  return [];
}
