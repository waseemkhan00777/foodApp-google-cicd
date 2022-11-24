const { IncomingWebhook } = require("@slack/webhook");
const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

// subscribe is the main function called by Cloud Functions.
module.exports.subscribe = (event, callback) => {
  console.log("event :: ", event);

  const build = eventToBuild(event.data);

  console.log("build: ", build);

  // Skip if the current status is not in the status list.
  // Add additional statues to list if you'd like:
  // QUEUED, WORKING, SUCCESS, FAILURE,
  // INTERNAL_ERROR, TIMEOUT, CANCELLED
  const status = ["QUEUED", "SUCCESS", "FAILURE", "INTERNAL_ERROR", "TIMEOUT"];
  if (status.indexOf(build.status) === -1) {
    return callback();
  }

  // Send message to Slack.
  const message = createSlackMessage(build);
  // Send the notification
  webhook.send(message);
};

// eventToBuild transforms pubsub event message to a build object.
const eventToBuild = (data) => {
  return JSON.parse(new Buffer(data, "base64").toString());
};

// createSlackMessage create a message from a build object.
const createSlackMessage = (build) => {
  let message = {
    text: `Build \`${build.id}\``,
    mrkdwn: true,
    attachments: [
      {
        title: "DEPLOYMENT SUCCESSFUL!!! 🎉🎉🎉",
        title_link: build.logUrl,
        fields: [
          {
            title: "Status",
            value: build.status,
          },
        ],
      },
    ],
  };
  return message;
};
