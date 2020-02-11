module.exports = {
    "opts": {
        "destination": "build/jsdoc",
        "encoding": "utf8",
        "private": true,
        "recurse": true,
        "template": "node_modules/docdash", // node_modules/minami
        "tutorials": "./docs/tutorials",
        "verbose": true
    },
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "excludePattern": "(node_modules/|dist|__tests__|stories)",
        "include": ["package.json", "README.md"],
        "includePattern": "src(.+)\\.(j|t)s(doc|x)?$"
    },
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": true,
        "showInheritedInNav": true,
        "useLongnameInNav": false
    },
    "docdash": {
        "sectionOrder": [ // Order the main section in the navbar (default order shown here)
            "Tutorials",
            "Namespaces",
            "Classes",
            "Modules",
            "Externals",
            "Events",
            "Mixins",
            "Interfaces"
        ],
        "menu": {
            "NetBrain Official Website": {
                "href": "https://www.netbraintech.com",
                "target": "_blank",
                "class": "menu-item",
                "id": "website_link"
            }
        }
    }
}
