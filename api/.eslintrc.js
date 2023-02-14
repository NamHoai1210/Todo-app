module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'max-len': [
            'error',
            {
              'code': 100,
              'tabWidth': 2,
              'ignoreComments': true, //"comments": 80
              'ignoreUrls': true,
              'ignoreStrings': true,
              'ignoreTemplateLiterals': true
            }
          ],
        'linebreak-style': [
            2,
            'unix'
        ],
        'quotes': [
            2,
            'single'
        ],
        'semi': [
            2,
            'always'
        ],
        'curly': [
            2,
            'all'
        ],
        'eqeqeq': [
            2,
            'smart'
        ],
        'one-var-declaration-per-line': [
            2,
            'always'
        ],
        'no-case-declarations': 0,
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        'require-jsdoc':'off',
        'react/prop-types': 'off',
        'react/display-name': 'off'
    }
};
