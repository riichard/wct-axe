# wct-axe

A web component tester plugin that performs automated accessibility 
scanning and generates a JSON report.

## How it works

The DOM tree is scanned after each `it()` and `test()`. Make sure
your test suites are properly fine-grained to allow the scan to run
after each significant DOM mutation.

## Usage

Enable the plugin in your Web Component Tester configuration.

    ...
    'plugins': {
        ...
        'axe': {
            // ... plugin options here
        },
        ...
    }
    ...
    
Inject the scanning tools. Include the following js files _once_ in each 
spec file, right before the test definitions. Use `tdd.js` for TDD
syntax and `bdd.js` for BDD syntax.

    <script src="../../wct-axe/lib/inject/tdd.js"></script>
    <script type="text/javascript">
    
        suite('app tests', function() {
    
            setup(function() {
                ...
            });
    
            teardown(function() {
                ...
            });
    
            test('does bla bla', function() {
                ...
            })
        });
        
    
...or... 
 
    <script src="../../wct-axe/lib/inject/bdd.js"></script>
    <script type="text/javascript">
    
        it('app tests', function() {
        
            beforeEach(function() {
                ...
            });
    
            afterEach(function() {
                ...
            });
    
            should('do bla bla', function() {
                ...
            });
            
        });
        

## Plugin options

### `jsonPath`

Path to write JSON results to. Default: `'results/a11y.json'`.

### `enableJsonOutput`

Whether JSON results should be generated. Default: `true`.

### `enableCliOutput`

Whether terminal output should be enabled. Default: `true`.

## Disabling the plugin

Use the command line argument `--skip-plugin axe` to disable this 
plugin when running the Web Component Tester.
