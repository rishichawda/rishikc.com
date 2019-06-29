---
title: Automate lighthouse audits for your Progressive Web App
subtitle: Testing with Mocha and Chai
date: "2019-06-29T22:12:03.284Z"
keywords: "progressive web application,pwa,test,chrome,lighthouse,audits,mocha,chai,best practices,performance, accessibility,tests,web development,configuration,web,application"
brief: We all know how important and helpful the insights are from lighthouse audits when we're developing our web applications. But the way most of us check is manually through Chrome devtools or the lighthouse extension, which in my opinion, is not very productive.
description: Automate your lighthouse audits with Mocha and chai instead of manually performing the audits on your progressive web application every time. Run all the tests programmatically in your continuous integration / deployment environments or on your local system.
path: "/articles/automate-lighthouse-audits-progressive-web-app/"
---

We all know how important and helpful the insights are from lighthouse audits when we're developing our web applications. But the way most of us check is manually through Chrome devtools or the lighthouse extension, which in my opinion, is not very productive.

For those of us who don't know, there are mainly four ways of auditing our web application with lighthouse :

- via Chrome devtools

- Command line

- NPM module
  ( which we are going to use in a while )

- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

For the purpose of programmatically performing lighthouse audits, we will use the [lighthouse npm package](https://www.npmjs.com/package/lighthouse), [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com) for writing our tests and [chrome-launcher](https://www.npmjs.com/package/chrome-launcher) for running our lighthouse tests.

First, let's install the above packages as dev dependencies in our project :

```bash
npm install lighthouse chrome-launcher chai mocha --save-dev
```

Now, let's create a file named `lighthouse.tests.js` in our `tests` directory. We'll run our lighthouse audits
through this file. Here, we'll import the lighthouse module and chrome launcher - which will enable us to open our webpage from local development server and run the audits to test against a minimum threshold that we want our lighthouse scores to be.

While this might sound a lot to do, it isn't much. Here's what it looks like on actual code :

```js
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

function launchChromeAndRunLighthouse(url, opts, conf = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, conf).then(res =>
        chrome.kill().then(() => res.lhr)
      );
    });
}
```

And it is as simple as that. We launch the chrome browser instance with `chromeLauncher.launch` method and then run lighthouse tests with the site url and configuration for our audits. After that is done, we close / kill the chrome instance and return the results. This is how it looks like when in use :

```js
launchChromeAndRunLighthouse(testUrl, opts, config).then(res => {
  // Results are available in `res`
});
```

So now, we can put this call inside our `before` hook for the tests and then have tests for each metric, something like this :

```js
describe("Lighthouse Audits", function() {
  // Timeout doesn't need to be same. It can be more or less depending on your project.
  this.timeout(50000);
  let results;
  before("run test", done => {
    launchChromeAndRunLighthouse(testUrl, opts, config).then(res => {
      // Extract the results you need for your assertions.
      done();
    });
  });
  it("performance test", done => {
    // test your performance score against the threshold
    done();
  });
  // Some more tests..
});
```

Still looks weird? Don't worry! Checkout this repository for example setup of [lighthouse tests with mocha](https://github.com/rishichawda/lighthouse-mocha-example) and try that out with your web application!

This method can be applied to automate the tests in continuous integration / deployment environments so that you don't have to worry about manually auditing your web application and checking wether it meets the minimum satisfactory levels.

So there you go. That's all we need to do for automating lighthouse audits for our progressive web applications to make sure they are always worthy for the internet and user's data packets!

![worthy](https://i.imgur.com/bTB3UGn.gif)

<br/>

_Did you like this article? Or did I miss something? Is there something that you have which can be added to this article -- that can make it even better?_

_Please leave a comment below or you can also contact me through my [social media profiles](/)._

_Thank you for reading!_ 😄

<br/>

Happy hacking! Cheers! 🎉

<hr/>
