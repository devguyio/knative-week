'use strict';
const { CloudEvent, HTTP } = require('cloudevents');
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const stringify = require('fast-json-stable-stringify');

const key = 'TOKEN';
const endpoint = 'https://knative-demo.cognitiveservices.azure.com/';
const textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));





// Send text to Azure Cognitive service for sentiment analysis
async function sentimentAnalysis(client, text) {
    const sentimentInput = [
        text
    ];
    const sentimentResult = await client.analyzeSentiment(sentimentInput);
    return sentimentResult[0].sentiment;
}

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
async function handle(context, event) {
    const parsedContext = JSON.parse(JSON.stringify(context, null, 2));
    const commentBody = parsedContext.cloudevent.data.comment.body;

    console.log("Logging context");
    console.log(JSON.stringify(context, null, 2));
    console.log("Logging event");
    console.log(JSON.stringify(event, null, 2));
    console.log("comment body - context " + commentBody);

    var sentiment = await sentimentAnalysis(textAnalyticsClient, commentBody);
    console.log("comment sentiment " + sentiment);

    return HTTP.binary(new CloudEvent({
        source: 'knweek.analyzer',
        type: 'sentiment',
        subject: parsedContext.cloudevent.data.comment.html_url,
        sentiment: sentiment
    }));
};

module.exports = handle;
