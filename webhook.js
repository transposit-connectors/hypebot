({ http_event }) => {
  const body = JSON.parse(http_event.body);
  if (body.challenge) {
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  } else {
    const { user, type } = body.event;
    
    if (api.run("this.users_with_hype").includes(user)) {
      if (type == "reaction_added") {
        const { reaction, item: { channel, ts }} = body.event;
        api.run("this.add_reactions", {name: reaction, channel , ts})
      } else if (type == "message") {
        const { text, channel, ts } = body.event;
        console.log(text)
        const emoji = api.run("this.sentence_seeker", {sentence: text});
        if (emoji.length == 0 && .5 > Math.random()) {
            const reactions = ["thumbsup", "star-struck", "heart_eyes", "sparkles", "heart", "clap", "ok_hand", "point_up", "sunglasses", "slightly_smiling_face"]
          	api.run("this.add_reactions", {name: reactions[Math.floor(Math.random()*reactions.length)], channel , ts})
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
