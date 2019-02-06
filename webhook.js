({ http_event }) => {
  const releaseTitle = JSON.parse(http_event.body).items[0].title;
  console.log(releaseTitle);
  
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