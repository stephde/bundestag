# Bundesfeed

Bundestag newsfeed app

[![Build Status](https://travis-ci.org/stephde/bundestag.svg?branch=master)](https://travis-ci.org/stephde/bundestag)

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## DB
start local mongo daemon by using:
``` bash
mongod --dbpath ./data/db
```

## Issues / Features / ToDo's
* Mobile Usage (touch control)
* filter (e.g. by party)
* sorting
* Design
* statistics
* signup with GitHub & Google
* add new data sources
* for articles with multiple parties selective vote
* underline sentences with quotes
* extract keywords
* new logo
* mark as read later
* add admin view (users, statistics)
* ...