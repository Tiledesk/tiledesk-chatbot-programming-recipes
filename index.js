/* 
    Andrea Sponziello - (c) 2022 Tiledesk.com
*/

const express = require('express');
const bodyParser = require('body-parser');
const { TiledeskClient } = require('@tiledesk/tiledesk-client');
const { Wikipedia } = require('./wikipedia');
const app = express();
app.use(bodyParser.json());

// Webhook endpoint for fallback-to-knowledge-base tutorial.
// Just add a webhook on "Message.create" event targeting this
// endpoint to see it in action.
// This webhook will send an asynchronuos message to the user chat
// if a fallback intent occurs on the chatbot.
// After a fallback (or under an intent confidence threshold) this
// snippet of code uses the original user question to trigger a
// search on a knowledge base (wikipedia) sending back to the user
// chat a set of results coming from the knowledge base (using url-buttons)
app.post('/webhook/search', async (req, res) => {
  // console.log('tiledesk webhook. ', req.connection.remoteAddress);
  //console.log('req.body ', JSON.stringify(req.body.payload.attributes));
  res.send(200);
  
  var project_id = req.body.hook.id_project;
  // console.log('project_id ', project_id);

  const payload = req.body.payload;

  var sender_id = payload.sender; //"bot_" + bot._id;
  // console.log('sender_id ', sender_id);
  
  var senderFullname = payload.senderFullname; //bot.name;
  // console.log('senderFullname ', senderFullname);
  
  var token = req.body.token;
  // console.log('token ', token);
  
  var request_id = payload.recipient;
  // console.log('request_id ', request_id);

  if (!req.body.payload.attributes.intent_info) {
    return;
  }

  //console.log("intent_info ok", req.body.payload.attributes.intent_info);

  const is_fallback = req.body.payload.attributes.intent_info.is_fallback;
  const intent_confidence = req.body.payload.attributes.intent_info.confidence;
  // console.log("INFO", req.body.payload.attributes.intent_info);
  let confidence_threshold = 0.7;
  // console.log("confidence_threshold", confidence_threshold);
  // console.log("intent_confidence < confidence_threshold", intent_confidence < confidence_threshold)
  if (is_fallback || (!is_fallback && intent_confidence < confidence_threshold)) {
    // console.log("starting Wikipedia search...");
  }
  else {
    return;
  }
  
  var question_payload = req.body.payload.attributes.intent_info.question_payload;
  // console.log("question_payload", question_payload)
  var text = question_payload.text;
  // console.log('text ', text);

  const wikipedia = new Wikipedia()
  wikipedia.doQuery(text, (err, results) => {
    // ex. results:
    // [{
    //   "title": "Teams",
    //   "path": "https://digitalbrickoffice365.sharepoint.com/SitePages/Teams.aspx"
    // }, {
    //   "title": "Teams",
    //   "path": "https://digitalbrickoffice365.sharepoint.com/SitePages/Microsoft-Teams-prova.aspx"
    // }]
    let attributes = {
      attachment: {
          type:"template",
          buttons: []
      }
    };
    // creating a set of URL-buttons (type 'self') for the resultset
    results.forEach(content => {
      const mobileUrl = content.path.replace(".wikipedia.org", ".m.wikipedia.org");
      var button = {type:"url", value: content.title, link: mobileUrl, target: "self"}
      attributes.attachment.buttons.push(button);
    });
    var msg = {
      text: 'You can be anyway interested in this articles on Wikipedia 🧐',
      sender: sender_id,
      senderFullname: senderFullname,
      attributes: attributes
    };
    const tdclient = new TiledeskClient(
      {
        projectId: project_id,
        APIKEY: '__APIKEY__',
        token: token
      });
    if (attributes.attachment.buttons.length > 0) {
      tdclient.sendSupportMessage(request_id, msg, function(err, result) {
        if (err) {
          console.log("An error occurred:", err);
        }
      });
    }
  });
 });

app.post('/whfallback', async (req, res) => {
  // console.log('req.body ', JSON.stringify(req.body));
  // INTENTS
  const intent = req.body.payload.intent.intent_display_name
  // console.log("intent:", intent);
  if (intent === 'fallback') {
    let text = req.body.payload.message.text;
    let token = req.body.token;
    const wikipedia = new Wikipedia()
    wikipedia.doQuery(text, (err, results) => {
      let attributes = {
        attachment: {
            type:"template",
            buttons: []
        }
      };
      // it creates a set of URL-buttons for the resultset
      results.forEach(content => {
        var button = {type:"url", value: content.title, link: content.path}
        attributes.attachment.buttons.push(button);
      });
      var msg = {
        text: 'Look at these articles on Wikipedia',
        attributes: attributes
      };
      // console.log("sending back:", JSON.stringify(msg));
      res.json(msg);
    });
  }
});

app.get('/', (req, res) => {
  res.status(200).send("Tiledesk fallback-to-search Tutorial");
});

// just have fun with this Wikipedia search api test-endpoint :)
app.get('/search', (req, res) => {
  const query = req.query['query'];
  console.log("query", query)
  const wikipedia = new Wikipedia()
  wikipedia.doQuery(query, (err, results) => {
    console.log("results", results)
    res.status(200).send(results);
  });
});

var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('server started');
});