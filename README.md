# tiledesk-fallback-to-search-tutorial

This tutorial will show you how to continure after a fallback on the native Resolution bot seamlessly to a suggested list of search results from a Knowledge base.

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

Once we create our new Resolution bot, we can move to the Webhooks section of your proect. Select _Settings > Proect settings > Developer > Webhook_ as in the following picture:

![image](https://user-images.githubusercontent.com/32564846/120284180-4871f480-c2bc-11eb-8262-bc0d21a1049a.png)

Now press _Manage Webhook_ then _Add Subscription_

The select the *Message create* event and insert the endpoint:

https://chatbot-fallback-to-search.tiledesk.repl.co/webhook/search

![image](https://user-images.githubusercontent.com/32564846/120284466-8ff88080-c2bc-11eb-8de6-208f2dfade0c.png)

