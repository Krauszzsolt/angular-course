# Prettier spike

## Prettier extension VScodeban

-   Extensions(Ctrl+Shift+x): Prettier - Code formatter
-   plugin jobb klikk -> Extension settings
    -   User (általános) vs Workspace(akutális projekthez tartozó) beállítások
    -   Szép UI felülettel rendelkezik
    -   Célszerű itt kipróbállni az alapbeállításokat
    -   Projektekhez nem célszerű itt megadni a beállításokat
    -   Helyette: .prettierrc.json (Következő pontban)

## Beállítás: .prettierrc.json-nel

-   A .vscode/settings.json fájlt ki kell egészíteni ezekkel:

    ```
    {
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "editor.formatOnSave": true
    }
    ```

-   Project root mappájába: .prettierrc.json kell létrehozni

    -   Egy példa beállítás:

        ```
        {
            "trailingComma": "none",
            "tabWidth": 2,
            "semi": true,
            "singleQuote": false
        }
        ```

    -   Különböző kiterjesztésű fájlok más beállításokkal (példa)

        ```
            {
                "semi":false,
                "tabWidth":2,
                "overrides":[
                    {
                        "files":"*.test.js",
                        "options":{
                            "semi":true
                        }
                    },
                    {
                    "files":[
                            "*.html",
                            "legacy/**/*.js"
                        ],
                        "options":{
                            "tabWidth":4
                        }
                    }
                ]
            }
        ```

-   Néhány fontos beállítás ([összes](https://prettier.io/docs/en/options.html))

    -   singleQuote: \<bool>
        -   True: 'Hello world'
        -   False: "Hello world"
    -   trailingComma: \"<es5 | none | all>"
        -   Egy felsorolásban az utolsó elem utána veszző beállítása. pl: Jsonben
            ```
                {
                    q:"What is the answer to life, the univers and everything?",
                    a:42, <---- Itt
                }
            ```
        -   es5-nél a a olyan helyeken van vessző, ahol megengedett, pl: (object, array, stb.). Jsonben nincs ebben a beállításban!
    -   Bracket Spacing: \<bool>

        -   true : { foo: bar }
        -   false : {foo: bar}

    -   jsxBracketSameLine: \<bool>

        -   true :

            ```
            <button
              className="prettier-class"
              id="prettier-id"
              onClick="{this.handleClick}">
              Click Here
            </button>
            ```

        -   false :

            ```
            <button
              className="prettier-class"
              id="prettier-id"
              onClick="{this.handleClick}"
            >
              Click Here
            </button>
            ```

    -   arrowParens: < always | avoid >

        -   "always" - (x) => x
        -   "avoid" - x => x

    -   endOfLine: "< lf | crlf | cr | auto >"

        -   Beállítja a sor vége karaktert

    -   htmlWhitespaceSensitivity: <css | strict | ignore >
        -   Default: css, ami inlene elemeket egy sorban hagyja és a blockokat több sorba töri.
            ```html
            <span class="dolorum atque aspernatur">Est molestiae sunt facilis qui rem.</span>
            <div class="voluptatem architecto at">Architecto rerum architecto incidunt sint.</div>
            ```

-   CLI

    -   CLI telepítése
        ```
        npm install --global prettier
        ```
    -   Lefutattás az egész projektre
        ```
        npx prettier --config .prettierrc --write .
        ```

-   Megjegyzések

    -   Jelenleg a meglévő sortörések megőrzése [nem megoldható](https://github.com/prettier/prettier/issues/4131#issuecomment-404603823). Bizonyos esetekben ez problémás lehet. Ilyen esetekre megoldás a prettier-ignore komment:

        ```javascript
        matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

        // prettier-ignore
        matrix(
           1, 0, 0,
           0, 1, 0,
           0, 0, 1
         )
        ```

        ```html
        <!-- prettier-ignore -->
        <div         class="x"       >hello world</div            >
        ```

        ```css
        /* prettier-ignore */
        .my    ugly rule
        {
        
        }
        ```

    -   Sajnos HTML fájlokat rosszul formáz, mert egy tag-nek új sorba töri záró kacsacsörjét. Ezért nem ajánlott HTML fájlokat formázni jelenleg. [A megoldáson dolgoznak](https://github.com/prettier/prettier/issues/5377)

        -   HTML fájlok ingorálása .prettierignor fájl valósítja meg a következő tartalommal a gyökérmappában:

        ```
            # Ignore all HTML files:
            *.html
        ```

-   Egy lehetséges Prettier beállítás:

    ```
    {
        "printWidth": 120,
        "tabWidth": 4,
        "singleQuote": true,
        "trailingComma": "none",
        "arrowParens": "avoid",
    }
    ```
