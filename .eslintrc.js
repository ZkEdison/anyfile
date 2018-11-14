module.exports = {
    "env": {
        "commonjs": true,
				"es6": true,
				"node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
		},
		"parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
				],
				"no-console": [
					"error",
					{
						"allow": ["warn", "error", "info"]
					}
				]
    }
};
