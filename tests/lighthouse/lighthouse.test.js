/* eslint-disable no-undef */
const { assert } = require('chai')

// Whhhhaaat? Yeah, you can import and use as you like.
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const Table = require('cli-table')

const table = new Table()

// Define our test url
// You could just as easily start a local server to test as well
const testUrl = 'http://localhost:9000'

function launchChromeAndRunLighthouse(url, opts, conf = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, conf).then(res =>
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      chrome.kill().then(() => res.lhr)
    )
  })
}

const options = {
  chromeFlags: ['--show-paint-rects'],
}

describe('Lighthouse PWA Testing', function() {
  this.timeout(50000)
  let results
  before('run base test', done => {
    launchChromeAndRunLighthouse(testUrl, options).then(res => {
      results = Object.keys(res.categories).reduce((merged, category) => {
        merged[category] = res.categories[category].score
        return merged
      }, {})
      done()
    })
  })

  it('should have performance score greater than 90', done => {
    assert.equal(results.performance > 0.9, true)
    done()
  })
  it('should have accessibility score greater than 90', done => {
    assert.equal(results.accessibility > 0.9, true)
    done()
  })
  it('should have best practices score greater than 90', done => {
    assert.equal(results['best-practices'] > 0.9, true)
    done()
  })
  it('should have seo score greater than 90', done => {
    assert.equal(results.seo > 0.9, true)
    done()
  })
  it('should have pwa score greater than 90', done => {
    assert.equal(results.pwa > 0.9, true)
    done()
  })
  after(() => {
    Object.keys(results).forEach(category => {
      table.push([category, Math.round(results[category] * 100)])
    })
    console.log(table.toString())
  })
})
