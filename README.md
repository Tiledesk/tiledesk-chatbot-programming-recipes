# tiledesk-fallback-to-search-tutorial

This tutorial demonstrates how to seamlessly continue after a fallback on the Resolution bot to a suggested list of search results from a Knowledge base (Wikipedia).

## Introduction

Chatbots training is a long journey, it requires weeks, months and probably years to reach a very good level of satisfaction.
You will never waste your time investing effort on improving your chatbot training, but it's worth to have some sort of integration between your chatbot and your already existing knowledge bases (KBs). The scope of this tutorial is to always reply on a fallback intent with some articles got from some knowledge base, so that the user will find, as often as possible, useful replies to his questions. The strategy exposed in this tutorial is to use the words in the user question to search in a knowledge base (i.e. Wikipedia) every time a fallback event occurs. From the programmatic point of view, every time the chatbot replies, it includes the original user question in a special payload of the reply message as well as the last _intent name_, _confidence level_ and _isfallback_ flag. With a webhook intercepting each reply, it's easy to trigger a search on the KB if the fallback flag is true or the confidence is not good enough.

## Create a new project and configure your first Resolution bot

Create a free [Tiledesk](https://tiledesk.com/) account. Then create a new Tiledesk Project. Name your project as you prefer. We used the name "Fallback to Search tutorial" for this tutorial.

![image](https://user-images.githubusercontent.com/32564846/116856257-1e64de00-abfb-11eb-8934-af31a980dbd9.png)

Skip with their default values all the other steps during project creation, and just land on the project's dashboard.

Now move on the sidebar and choose the _Settings > Bots_ section. Press the _Add bot_ button. Choose _Resolution_

![image](https://user-images.githubusercontent.com/32564846/120277845-e19d0d00-c2b4-11eb-9e7a-7e67b9751a43.png)

Now choose a name and a description for your chatbot:

![image](https://user-images.githubusercontent.com/32564846/120278354-77389c80-c2b5-11eb-85b4-4546ed000b4a.png)

When asked, Activate this bot.

![image](https://user-images.githubusercontent.com/32564846/120278436-90d9e400-c2b5-11eb-8f8a-a71cb473fa4b.png)

Optionally you can further configure your bot (i.e. choosing a profile image, improving training etc.) but we'll skip these steps, opting to focus on the Wikipedia integration. Target of our chatbot is, every time a fallback event occurs, using the question phrase of the end user to trigger a search on Wikipedia, showing the results to the user.

## Programmatic management of your fallbacks

The source code used in this example is available as a [replit](https://replit.com) application [here](https://replit.com/@tiledesk/chatbot-fallback-to-search#index.js).

The source code is also available on Github [here](https://github.com/Tiledesk/tiledesk-fallback-to-search-tutorial)

Fork the application in your own repl (or on your own server) so you can modify the code, primarily with the scope of connecting your own Knowledge Base (Wikipedia here is just used as an example).

![image](https://user-images.githubusercontent.com/32564846/120932896-f3891080-c6f7-11eb-9c10-1203e03101bc.png)

Choose a new name for the application. We used _my-chatbot-fallback-to-search_, but you feel free to use your preferred name.

![image](https://user-images.githubusercontent.com/32564846/120932951-321ecb00-c6f8-11eb-94c4-9a60a6d948ab.png)

Once the application is forked, press the Run button on the top bar, as in the following picture:

![image](https://user-images.githubusercontent.com/32564846/120933051-ace7e600-c6f8-11eb-8728-b023a4653a8d.png)

Once our Replit app is up and running, we can move to the Webhooks section of your project. Select _Settings > Project settings > Developer > Webhook_ as in the following picture:

![image](https://user-images.githubusercontent.com/32564846/120284180-4871f480-c2bc-11eb-8262-bc0d21a1049a.png)

Now press _Manage Webhook_ then _Add Subscription_

Select *Message create* event from the menù and type the following endpoint url:

https://mychatbot-fallback-to-search.YOUR-REPL.repl.co/webhook/search

![image](https://user-images.githubusercontent.com/32564846/120284466-8ff88080-c2bc-11eb-8de6-208f2dfade0c.png)

After this subscription your endpoint will be notified about every message sent on your proect.

Before going deep into the mechanics of the tutorial, we can already see it in action.

From the top of your dashboard press the green button "Simulate visitor". A page with a widget appears. Just start a new conversation. If you type Hello the bot will reply with the trained intent:

![image](https://user-images.githubusercontent.com/32564846/120288118-2a0df800-c2c0-11eb-8ca7-fa2779df3704.png)

Now type in something that the chatbot is not trained to reply to (i.e. 'quantum field' or whatever you like)

![image](https://user-images.githubusercontent.com/32564846/120288614-b28c9880-c2c0-11eb-88fd-9b445ec73f13.png)

As you can see the bot initially replies with the default fallback phrase, immediately followed by a new reply with a suggested list of Wikipedia results.

![image](https://user-images.githubusercontent.com/32564846/120288813-eb2c7200-c2c0-11eb-915a-0f74a5c198a0.png)
 
The proposed buttons are link-buttons. Pressing the button will open the Wikipedia article in the browser.

Enjoy Tiledesk!
