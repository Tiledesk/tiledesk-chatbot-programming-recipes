# tiledesk-fallback-to-search-tutorial

This tutorial will show you how to complete a fallback intent on the native Resolution bot with a suggested list of search results from a Knowledge base.

## Introduction

Chatbots training is a long journey, it requires weeks, months and probably years to reach a very good level of satisfaction.
While you never waste time investing effort improving your chatbot training phrases, it's worth to have some sort of integration between your chatbot and your already existing knowledge bases (KBs). The scope of this tutorial is to always reply o a fallback intent with some articles got from some knowledge base, so that the user will find, as often as possible, useful replies to his questions. The strategy exposed in this tutorial is to use the words in the user question to search in a knowledge base (i.e. Wikipedia). Every time the chatbot replies, it includes the original user question in a special payload of the reply message as well as the previous _intent name_, _confidence level_ and _fallback_ flag. With a webhook intercepting each reply, it's easy to trigger a search on the KB if the fallback flag is true or the confidence is not good enough.


## Create a new project and configure your first Resolution bot

Create a free [Tiledesk](https://tiledesk.com/) account. Then create a new Tiledesk Project. Name your project as you prefer. We used the name "Fallback to Search tutorial" for this tutorial.

![image](https://user-images.githubusercontent.com/32564846/116856257-1e64de00-abfb-11eb-8934-af31a980dbd9.png)

Ignore al the other tutorial steps, and just land on the project's dashboard.

Now move on the sidebar and choose the _Settings > Bots_ section. Press the _Add bot_ button. Choose _Resolution_

