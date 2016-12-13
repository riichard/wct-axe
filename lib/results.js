module.exports = (function() {

    /**
     * Initializes the ResultsArray class.
     *
     * This class represents the results array within an a11y report and is used for deduping purposes.
     *
     * @param {Object[]} resultsArray If supplied, initializes to this array, otherwise defaults to an empty array.
     * @constructor
     */
    var ResultsArray = function(resultsArray) {
        this.data = resultsArray || [];
    };

    /**
     * Merges the given results array.
     *
     * @param {Object[]} resultsArray The results array to merge.
     */
    ResultsArray.prototype.mergeResultsArray = function(resultsArray) {
        var myClass = this;
        resultsArray.forEach(function(resultsObject) {
            myClass.insertResultsObject(resultsObject);
        });
    };

    /**
     * Inserts the given results object.
     *
     * @param {Object} resultsObject The results object to insert.
     */
    ResultsArray.prototype.insertResultsObject = function(resultsObject) {
        var foundResultsObject = this.findResultsObject(resultsObject.suite);

        if(!foundResultsObject) {
            this.data.push(resultsObject);
            return;
        }

        var violationsArray = new ViolationsArray(foundResultsObject.violations);
        violationsArray.mergeViolationsArray(resultsObject.violations);
    };

    /**
     * Finds and returns the results object that has the given suite name.
     *
     * @param {string} suite The suite name to match.
     * @returns {Object|undefined} The found results object. If not found, returns undefined.
     */
    ResultsArray.prototype.findResultsObject = function(suite) {
        var foundObject;
        this.data.forEach(function(obj) {
            if(obj.suite === suite) {
                foundObject = obj;
            }
        });
        return foundObject;
    };

    // ---

    /**
     * Initializes the ViolantionsArray class.
     *
     * This class represents the violations array within a results object and is used for deduping purposes.
     *
     * @param {Object[]} violationsArray If supplied, initializes to this array, otherwise defaults to an empty array.
     * @constructor
     */
    var ViolationsArray = function(violationsArray) {
        this.data = violationsArray || [];
    };

    /**
     * Merges the given violations array.
     *
     * @param {Object[]} violationsArray The violations array to merge.
     */
    ViolationsArray.prototype.mergeViolationsArray = function(violationsArray) {
        var myClass = this;
        violationsArray.forEach(function(violationsObject) {
            myClass.insertViolationsObject(violationsObject);
        });
    };

    /**
     * Inserts the given violations object.
     *
     * @param {Object} violationsObject The violations object to insert.
     */
    ViolationsArray.prototype.insertViolationsObject = function(violationsObject) {
        var foundViolationsObject = this.findViolationsObject(violationsObject.id);

        if(!foundViolationsObject) {
            this.data.push(violationsObject);
            return;
        }

        var nodesArray = new NodesArray(foundViolationsObject.nodes);
        nodesArray.mergeNodesArray(violationsObject.nodes);
    };

    /**
     * Finds and returns the violations object that has the given ID.
     *
     * @param {string} id The ID to match.
     * @returns {Object|undefined} The found violations object. If not found, returns undefined.
     */
    ViolationsArray.prototype.findViolationsObject = function(id) {
        var foundObject;
        this.data.forEach(function(obj) {
            if(obj.id === id) {
                foundObject = obj;
            }
        });
        return foundObject;
    };

    // ---

    /**
     * Initializes the NodesArray class.
     *
     * This class represents the nodes array within a violations object and is used for deduping purposes.
     *
     * @param {Object[]} nodesArray If supplied, initializes to this array, otherwise defaults to an empty array.
     * @constructor
     */
    var NodesArray = function(nodesArray) {
        this.data = nodesArray || [];
    };

    /**
     * Merges the given nodes array.
     *
     * @param {Object[]} nodesArray The nodes array to merge.
     */
    NodesArray.prototype.mergeNodesArray = function(nodesArray) {
        var myClass = this;
        nodesArray.forEach(function(nodesObject) {
            myClass.insertNodesObject(nodesObject);
        });
    };

    /**
     * Inserts the given nodes object.
     *
     * @param {Object} nodesObject The nodes object to insert.
     */
    NodesArray.prototype.insertNodesObject = function(nodesObject) {
        var foundNodesObject = this.findNodesObject(nodesObject.target);

        if(!foundNodesObject) {
            this.data.push(nodesObject);
        }
    };

    /**
     * Finds and returns the violations object that has the given target.
     *
     * @param {string} target The target to match.
     * @returns {Object|undefined} The found nodes object. If not found, returns undefined.
     */
    NodesArray.prototype.findNodesObject = function(target) {
        var foundObject;
        this.data.forEach(function(obj) {
            if(obj.target[0] === target[0]) {
                foundObject = obj;
            }
        });
        return foundObject;
    };

    return {
        "ResultsArray": ResultsArray,
        "ViolationsArray": ViolationsArray,
        "NodesArray": NodesArray
    }

})();
