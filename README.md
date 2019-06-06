# Slackbot that reacts to messages

This Transposit app listens to messages from slack, looks up the words from each message in a thesaurus, and responds to the message with a set of matching emoji reactions.

To create your own hypebot (or any slackbot):

  1. Fork this app in transposit!
  2. Visit https://api.slack.com/apps and click "Create New App"
  3. Add the bot features:
    * Once the app is created, under Bot Users, click "Add a Bot User"
    * Under OAuth & Permissions > Scopes, add the redirect url "https://accounts.transposit.com/oauth/v2/handle-redirect" and the "bot" scope.
    * Under Event Subscriptions, Enable Events and set the request url to your transposit webhook url which you can find in Transposit under Deploy > Endpoints.
    * Under Event Subscriptions > Subscribe to Bot Events, click "Add Bot User Event" and add the "message.channels" event.
  4. Link Transposit and Slack:
    * Under Basic Information > App Credentials, copy the Client ID and Secret. Then in transposit, click on the "slackbot" Data connection and paste them under "Authentication"
    * In Transposit, oauth both the slack and slackbot data connectors

 Viola! Your bot is ready for use.

