() => {
  const reactions = ["thumbsup", "star-struck", "heart_eyes", "sparkles", "heart", "clap", "ok_hand", "point_up", "sunglasses", "slightly_smiling_face"]
  return reactions[Math.floor(Math.random()*reactions.length)];
}