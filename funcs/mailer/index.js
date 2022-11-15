'use strict';
const { CloudEvent, HTTP } = require('cloudevents');
const nodemailer = require("nodemailer");

const SENTIMENT_NEGATIVE = "negative"
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "githubmoderator@gmail.com",
    pass: "PASSWORD",
  },
});


/**
 * A function that responds to incoming CloudEvents over HTTP from,
 * for example, a Knative event Source, Channel or Broker.
 *
 * If running via 'npm run local', it can be invoked like so:
 *
 * curl -X POST -d '{"name": "Tiger", "customerId": "0123456789"}' \
 *  -H'Content-type: application/json' \
 *  -H'Ce-id: 1' \
 *  -H'Ce-source: cloud-event-example' \
 *  -H'Ce-type: dev.knative.example' \
 *  -H'Ce-specversion: 1.0' \
 *  http://localhost:8080
 *
 * @param {Context} context the invocation context
 * @param {Object} event the CloudEvent 
 */
function handle(context, event) {
  const parsedContext = JSON.parse(JSON.stringify(context, null, 2));
  const sentiment = event.sentiment;
  console.log(`Found sentiment ${sentiment}`);

  if (sentiment == SENTIMENT_NEGATIVE) {
    let mailBody = `
  Hi!
  This is your friendly GitHub Moderator Power By Knative (TM). 
  I just spotted what seems like a negative comment on one of your issues. 
  Comment URL: ${event.subject}
  ` 
    let mailDetails = {
      from: "githubmoderator@gmail.com",
      to: "devguyio@knative.team",
      subject: "Negative comment found!",
      text: mailBody,
    };
    context.log.info("mail");

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
  }
  console.log("context");
  console.log(JSON.stringify(context, null, 2));

  console.log("event");

};


module.exports = handle;
