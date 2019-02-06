({ http_event }) => {
  const releaseTitle = JSON.parse(http_event.body).items[0].title;
  console.log(releaseTitle);
  
  //api.run("this.execute_crawler");
  const crawler_results = api.run("this.get_crawler_last_execution_results")[0].releaseNotes;
  
  const sentences = crawler_results.trim().split(/[\n\t]+/)
  
  console.log(sentences);
  
  for (i=3; i<sentences.length; i++) {
    console.log(api.run("this.sentence_seeker", {sentence: sentences[i]}))
  }
  
  return {
    status_code: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Thanks, buddy"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/building/webhooks
 */