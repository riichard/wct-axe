var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var reporter = require('./lib/reporter');
var results = require('./lib/results');

/**
 * Loads a11y scripts into the generated index of Web Component Tester,
 * and then listens for events to process incoming results.
 *
 * @param context
 * @param pluginOptions
 * @param plugin
 */
module.exports = function(context, pluginOptions, plugin) {

    var jsonPath = pluginOptions.jsonPath || 'results/a11y.json';
    var resultsArray;
    var totalIssues;
    var totalTests;

    /**
     * Returns the value of enableJsonOutput plugin option.
     *
     * @returns {boolean} True if JSON results output is enabled (default), false otherwise.
     */
    function jsonEnabled() {
        return pluginOptions.enableJsonOutput !== false;
    }

    /**
     * Returns the value of enableCliOutput plugin option.
     *
     * @returns {boolean} True if CLI results output is enabled (default), false otherwise.
     */
    function cliEnabled() {
        return pluginOptions.enableCliOutput !== false;
    }

    function runStartEvent() {
        // Initialize variables
        resultsArray = new results.ResultsArray();
        totalIssues = totalTests = 0;
    }

    /**
     * Processes results.
     */
    function a11yResultsEvent() {
        var data = arguments[1];
        totalIssues += data.violations.length;
        totalTests++;

        // Process & dedupe results
        if(jsonEnabled() || cliEnabled()) {
            resultsArray.mergeResultsArray([data]);
        }
    }

    /**
     * Writes JSON and outputs total violations.
     */
    function runEndEvent() {

        // Write the JSON report
        if(jsonEnabled()) {

            // Create dir if necessary
            if(!fs.existsSync(path.dirname(jsonPath))) {
                mkdirp.sync(path.dirname(jsonPath));
            }

            // Write file
            fs.writeFileSync(
                jsonPath,
                JSON.stringify(
                    {
                        "tests": totalTests,
                        "violations": totalIssues,
                        "results": resultsArray.data
                    }, null, 2)
            );

        }

        // Output CLI Report
        if(cliEnabled()) {
            reporter.report(resultsArray.data, 0);
        }

        // Output totals in terminal
        var messageTotalTests = 'Suites tested: ' + totalTests;
        if(totalTests === 0) {
            messageTotalTests = reporter.color(31, messageTotalTests);
        }

        var messageTotalIssues = 'Violations found: ' + totalIssues;
        if(totalIssues > 0) {
            messageTotalIssues = reporter.color(31, messageTotalIssues);
        }

        console.log('ACCESSIBILITY TOTALS:');
        console.log(messageTotalTests);
        console.log(messageTotalIssues);

    }

    // Load required scripts
    context.options.extraScripts.push(
        '/socket.io/socket.io.js',
        '../wct-axe/lib/a11y.js'
    );

    // React to some events
    context.on('run-start', runStartEvent);
    context.on('a11y-results', a11yResultsEvent);
    context.on('run-end', runEndEvent);

};
