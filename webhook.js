({ http_event, hype_level }) => {
  const randomHype = () => .1 * hype_level > Math.random()
  const body = JSON.parse(http_event.body);
  if (body.challenge) {
    // https://api.slack.com/events/url_verification
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  } else {
    const { user, type, subtype } = body.event;
    // don't hype everyone, all the time
    if (api.run("this.users_with_hype").includes(user) || randomHype()) {
      if (type == "reaction_added") {
        const { reaction, item: { channel, ts }} = body.event;
        api.run("this.add_reactions", {name: reaction, channel , ts})
      } else if (type == "message" && subtype == "bot_message" /* don't respond to other bots */) {
        const { text, channel, ts } = body.event;
        console.log(text)
        const emoji = api.run("this.sentence_seeker", {sentence: text, hype_level});
        if (emoji.length == 0 && randomHype()) {
          // we didn't find anything but here's a consolation prize
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
