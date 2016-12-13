var a11y = (function() {

    /**
     * Browser ID of the browser on which the currently generated index is running.
     *
     * @type {string}
     */
    var browserId = window.location.search.match(/cli_browser_id=(\d+)/i)[1];

    /**
     * Socket.io object to communicate with plugin's 'backend'.
     *
     * @type {Object}
     */
    var socket = io(window.location.protocol + '//' + window.location.host);

    /**
     * Options for Axe.
     *
     * WCAG 2 Levels A and AA are checked.
     * Duplicate ID checks are disabled because Axe does not support Shadow DOM.
     *
     * @type {Object}
     */
    var axeOptions = {
        runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa"]
        },
        "rules": {
            "duplicate-id": { enabled: false }
        }
    };

    /**
     * Initializes variables and injects Axe.
     *
     * @param {Object} windowScope Window object to inject Axe into.
     * @param {Object} testVars Test variables.
     * @param done Callback to support async.
     */
    function init(windowScope, testVars, done) {
        testVars.suiteTitle = "";
        testVars.violationsArray = [];
        loadScript(windowScope.document, '/components/wct-axe/app/lib/axe-core/axe.min.js', function() { done() });
    }

    /**
     * Scans DOM and generates results object.
     *
     * @param {Object} windowScope Window object that should be scanned.
     * @param {Object} testVars Test variables object to update.
     * @param {Object} testContext Test context of currently running test.
     * @param done Callback to support async.
     */
    function test(windowScope, testVars, testContext, done) {
        testVars.suiteTitle = testContext.currentTest.parent.title;
        windowScope.axe.a11yCheck("body", axeOptions, function(resultsObject) {
            testVars.violationsArray = resultsObject.violations;
            done();
        });
    }

    /**
     * Emits results object to the plugin's backend.
     *
     * @param {Object} testVars Test variables.
     */
    function emit(testVars) {
        socket.emit('client-event', {
            browserId: browserId,
            event: 'a11y-results',
            data: {
                "suite": testVars.suiteTitle,
                "violations": testVars.violationsArray
            }
        });
    }

    /**
     * Injects script tag into given document.
     *
     * @param {Object} doc Document element to inject into.
     * @param {string} url Path to put in script elements src attribute.
     * @param callback Callback to call after the script has loaded.
     */
    function loadScript(doc, url, callback)
    {
        var head = doc.getElementsByTagName('head')[0];
        var script = doc.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        script.onreadystatechange = callback;
        script.onload = callback;

        head.appendChild(script);
    }

    /**
     * Checks whether shadow dom is enabled.
     *
     * @param windowScope Window object that contains the tests.
     * @returns {boolean} True if enabled, false otherwise.
     */
    function shadowDomEnabled(windowScope) {
        return /dom=shadow/i.test(windowScope.location.search);
    }

    return {

        /**
         * Hooks into necessary test stages for BDD syntax.
         *
         * @param {Object} windowScope Window object that contains the tests.
         */
        "injectBdd": function(windowScope) {

            // Shadow dom not supported by Axe
            if(shadowDomEnabled(windowScope)) {
                return;
            }

            /**
             * Contains all collected accessibility violations and other data.
             *
             * @type {Object}
             */
            var testVars = {};

            try {
                windowScope.before(function() {
                    init(windowScope, testVars, done);
                });
                windowScope.afterEach(function() {
                    test(windowScope, testVars, this, done);
                });
                windowScope.after(function() {
                    emit(testVars);
                });
            } catch(err) {
                console.error("Could not initialize global BDD hooks:", err.message);
            }
        },

        /**
         * Hooks into necessary test stages for TDD syntax.
         *
         * @param {Object} windowScope Window object that contains the tests.
         */
        "injectTdd": function(windowScope) {

            // Shadow dom not supported by Axe
            if(shadowDomEnabled(windowScope)) {
                return;
            }

            /**
             * Contains all collected accessibility violations and other data.
             *
             * @type {Object}
             */
            var testVars = {};

            try {
                windowScope.suiteSetup(function(done) {
                    init(windowScope, testVars, done);
                });
                windowScope.teardown(function(done) {
                    test(windowScope, testVars, this, done);
                });
                windowScope.suiteTeardown(function() {
                    emit(testVars);
                });
            } catch(err) {
                console.error("Could not initialize global TDD hooks:", err.message);
            }
        }

    }

}());
