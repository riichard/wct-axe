'use script';

var a11y = require('../lib/a11y');

describe('Deduplication classes', function() {

    describe('ResultsArray', function() {

        it('should take an array and merge with it based on unique urls', function() {

            var resultsArray = new a11y.ResultsArray();
            resultsArray.mergeResultsArray([
                {
                    'url': '123',
                    'violations': []
                },
                {
                    'url': '456',
                    'violations': []
                },
                {
                    'url': '789',
                    'violations': []
                }
            ]);

            expect(resultsArray.data.length).toBe(3);
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'123',violations:[]}]));
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'456',violations:[]}]));
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'789',violations:[]}]));



            resultsArray = new a11y.ResultsArray();
            resultsArray.mergeResultsArray([
                {
                    'url': '123',
                    'violations': []
                },
                {
                    'url': '456',
                    'violations': []
                },
                {
                    'url': '789',
                    'violations': []
                },
                {
                    'url': '456',
                    'violations': []
                }
            ]);

            expect(resultsArray.data.length).toBe(3);
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'123',violations:[]}]));
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'456',violations:[]}]));
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'789',violations:[]}]));




            resultsArray = new a11y.ResultsArray();
            resultsArray.mergeResultsArray([
                {
                    'url': '123',
                    'violations': []
                },
                {
                    'url': '456',
                    'violations': []
                }
            ]);

            resultsArray.mergeResultsArray([
                {
                    'url': '789',
                    'violations': []
                },
                {
                    'url': '456',
                    'violations': []
                }
            ]);

            expect(resultsArray.data.length).toBe(3);
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'123',violations:[]}]));
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'456',violations:[]}]));
            expect(resultsArray.data).toEqual(jasmine.arrayContaining([{url:'789',violations:[]}]));

        });



    });

    describe('ViolationsArray', function() {
        it('should take an array and merge with it based on unique id', function() {

            var violationsArray = new a11y.ViolationsArray();
            violationsArray.mergeViolationsArray([
                {
                    'id': '123',
                    'nodes': []
                },
                {
                    'id': '456',
                    'nodes': []
                },
                {
                    'id': '789',
                    'nodes': []
                }
            ]);

            expect(violationsArray.data.length).toBe(3);
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'123',nodes:[]}]));
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'456',nodes:[]}]));
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'789',nodes:[]}]));



            violationsArray = new a11y.ViolationsArray();
            violationsArray.mergeViolationsArray([
                {
                    'id': '123',
                    'nodes': []
                },
                {
                    'id': '456',
                    'nodes': []
                },
                {
                    'id': '789',
                    'nodes': []
                },
                {
                    'id': '456',
                    'nodes': []
                }
            ]);

            expect(violationsArray.data.length).toBe(3);
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'123',nodes:[]}]));
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'456',nodes:[]}]));
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'789',nodes:[]}]));




            violationsArray = new a11y.ViolationsArray();
            violationsArray.mergeViolationsArray([
                {
                    'id': '123',
                    'nodes': []
                },
                {
                    'id': '456',
                    'nodes': []
                }
            ]);

            violationsArray.mergeViolationsArray([
                {
                    'id': '789',
                    'nodes': []
                },
                {
                    'id': '456',
                    'nodes': []
                }
            ]);

            expect(violationsArray.data.length).toBe(3);
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'123',nodes:[]}]));
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'456',nodes:[]}]));
            expect(violationsArray.data).toEqual(jasmine.arrayContaining([{id:'789',nodes:[]}]));

        });
    });

    describe('NodesArray', function() {

        it('should take an array and merge with it based on target css', function() {

            var nodesArray = new a11y.NodesArray();
            nodesArray.mergeNodesArray([
                {
                    'target': '123',
                },
                {
                    'target': '456',
                },
                {
                    'target': '789',
                }
            ]);

            expect(nodesArray.data.length).toBe(3);
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'123'}]));
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'456'}]));
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'789'}]));



            nodesArray = new a11y.NodesArray();
            nodesArray.mergeNodesArray([
                {
                    'target': '123',
                },
                {
                    'target': '456',
                },
                {
                    'target': '789',
                },
                {
                    'target': '456',
                }
            ]);

            expect(nodesArray.data.length).toBe(3);
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'123'}]));
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'456'}]));
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'789'}]));




            nodesArray = new a11y.NodesArray();
            nodesArray.mergeNodesArray([
                {
                    'target': '123',
                },
                {
                    'target': '456',
                }
            ]);

            nodesArray.mergeNodesArray([
                {
                    'target': '789',
                },
                {
                    'target': '456',
                }
            ]);

            expect(nodesArray.data.length).toBe(3);
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'123'}]));
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'456'}]));
            expect(nodesArray.data).toEqual(jasmine.arrayContaining([{target:'789'}]));

        });

    });

});
