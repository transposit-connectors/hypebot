(params) => {
  var _ = require('underscore.js');
  const dict_results = api.run("this.def_and_syn", params);
  const results = api.run("this.extract_syn", {dict_results})
  return _.uniq(_.flatten(results.map(res => [res.id, ...res.syns])));
}
