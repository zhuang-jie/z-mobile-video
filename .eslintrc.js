module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        './.eslintrc-auto-import.json'
    ],
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^h$',
                varsIgnorePattern: '^h$'
            }
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 5
                },
                multiline: {
                    max: 1
                }
            }
        ],
        'vue/script-setup-uses-vars': 'error',
        'vue/no-dupe-v-else-if': 'error',
        'vue/html-closing-bracket-newline': 'off', // 不强制换行
        'vue/singleline-html-element-content-newline': 'off', // 不强制换行
        'vue/multiline-html-element-content-newline': 'off',
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/valid-template-root': 'off',
        'vue/html-self-closing': 0,
        'vue/html-indent': ['error', 4],

        'accessor-pairs': 2, // 禁止在对象中使用getter/setter
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        'no-console': [
            // 禁止使用console，除了console.log
            'warn',
            { allow: ['log'] }
        ],
        'no-var': 'error', // 禁止使用 var
        'no-eval': 'error', // 禁止使用eval
        'no-alert': 'error', // 禁止使用alert
        semi: [2, 'never'], // 禁止尾部使用分号“ ; ”
        indent: ['error', 4], // 缩进4格
        'no-mixed-spaces-and-tabs': 'error', // 不能空格与tab混用
        quotes: [2, 'single'], // 使用单引号
        'arrow-spacing': [ // 箭头左右间距
            2,
            {
                before: true,
                after: true
            }
        ],
        'block-spacing': [2, 'always'], // 块间距
        'brace-style': [ // 大括号风格，允许一行
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        'comma-spacing': [ // 控制逗号前后的空格
            2,
            {
                before: false,
                after: true
            }
        ],
        'comma-style': [2, 'last'], // 控制逗号在行尾出现
        eqeqeq: ['error', 'always', { null: 'ignore' }], // 必须使用全等
        'keyword-spacing': ['error', { 'after': true }], // 关键字前后加空格
        'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 冒号后面加空格
        'no-trailing-spaces': 2, // 禁止末尾+空格
        'space-before-function-paren': [2, 'never'], // fun左括号不能有空格
        'space-before-blocks': [2, 'always'], // {}左边必须有空格
        'array-bracket-spacing': [2, 'never'], // 禁止数组[]中使用空格
        'prefer-const': 2, // 强行const
        'object-curly-spacing': [ // {}使用一致的空格
            2,
            'always',
            {
                objectsInObjects: false
            }
        ],
    }
}