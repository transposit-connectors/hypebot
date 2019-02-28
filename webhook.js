({ http_event, hype_level }) => {
  const body = JSON.parse(http_event.body);
  if (body.challenge) {
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  } else {
    const { user, type } = body.event;
    if (api.run("this.users_with_hype").includes(user) || .1 * hype_level > Math.random()) {
      if (type == "reaction_added") {
        const { reaction, item: { channel, ts }} = body.event;
        api.run("this.add_reactions", {name: reaction, channel , ts})
      } else if (type == "message") {
        const { text, channel, ts } = body.event;
        console.log(text)
        const emoji = api.run("this.sentence_seeker", {sentence: text, hype_level});
        if (emoji.length == 0 && .1 * hype_level > Math.random()) {
          	api.run("this.add_reactions", {name: api.run("this.positive_affirmation")[0], channel , ts})
        } else {
	        emoji.map(e => api.run("this.add_reactions", {name: e, channel , ts}));
        }
      }
    }
  }
  return {
    status_code: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Thanks, buddy"
  };
}
