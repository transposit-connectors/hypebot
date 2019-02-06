({ http_event }) => {
  return {
    status_code: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Hello World"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/building/webhooks
 */