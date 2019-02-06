(params) => {
  return api.runBulk(params.sentence.split(" ").map(s => {
    return {
      operation: "this.word_search",
      parameters: {word: s},
    };
  }))
}