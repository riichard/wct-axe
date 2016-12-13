

module.exports = (function() {

    /**
     * Modifies color of text intended for terminal output.
     *
     * @param {number} code Color code.
     * @param {string} str Text to change color of.
     * @returns {string}
     */
    function color(code, str) {
        return '\u001b[' + code + 'm' + str + '\u001b[0m';
    }

    /**
     * Outputs results to console.
     *
     * @param {Object} results Results object to output.
     * @param {number} threshold Max allowed violations.
     * @returns {boolean} True if violations stay below threshold, false otherwise.
     */
    function report(results, threshold) {
        var pass = true;

        console.log('-------------------------');
        console.log('# ACCESSIBILITY RESULTS #');
        console.log('-------------------------');
        results.forEach(function(result) {
            console.log('TEST SUITE: ' + result.suite); // subhead
            var violations = result.violations;
            if (violations.length) {
                if (threshold < 0) {
                    console.log('Found ' + violations.length + ' accessibility violations: (no threshold)');
                } else if (violations.length > threshold) {
                    pass = false;
                    console.error('Found ' + violations.length + ' accessibility violations:');
                } else {
                    console.log('Found ' + violations.length + ' accessibility violations: (under threshold of ' + threshold + ')');
                }
                violations.forEach(function(ruleResult) {
                    console.log(' ' + color(31, '\u00D7') + ' ' + ruleResult.help); //subhead

                    ruleResult.nodes.forEach(function(violation, index) {
                        console.log('   ' + (index + 1) + '. ' + JSON.stringify(violation.target));

                        if (violation.any.length) {
                            console.log('       Fix any of the following:');
                            violation.any.forEach(function(check) {
                                console.log('        \u2022 ' + check.message);
                            });
                        }

                        var alls = violation.all.concat(violation.none);
                        if (alls.length) {
                            console.log('       Fix all of the following:');
                            alls.forEach(function(check) {
                                console.log('        \u2022 ' + check.message);
                            });
                        }
                        console.log();
                    });
                });
            } else {
                console.log('Found no accessibility violations.');
            }
            console.log('-------------------------');
        });

        return pass;
    }

    return {
        color: color,
        report: report
    }
})();
