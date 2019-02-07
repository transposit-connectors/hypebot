({ http_event }) => {
  const body = JSON.parse(http_event.body);
  if (body.challenge) {
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  } else {
    console.log(body)
  }

  
/*  const sentences = crawler_results.trim().split(/[\n\t]+/)
  
  console.log(sentences);
  
  let result = [];
  
  for (i=3; i<sentences.length; i++) {
    result.push(api.run("this.sentence_seeker", {sentence: sentences[i]}));
  }
  console.log(result);*/
  
  return {
    status_code: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Thanks, buddy"
  };
}
