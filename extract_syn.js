(params) => params.dict_results.map(res => {
  const {id, uuid} = res;
  let syn_dict = {};

  if (res.syns) {
    const reg = RegExp('\{sc\}([a-zA-Z]+)\{\/sc\}','g');
    syn_text = res.syns[0].pt[0][1];
    let match;
    while (match = reg.exec(syn_text)) {
      syn_dict[match[1]] = 1;
    }
  }
  return {
    id,
    uuid,
    syns: Object.keys(syn_dict)
  }; 
})
