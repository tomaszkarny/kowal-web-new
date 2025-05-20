import React from "react"
import PropTypes from "prop-types"

// Niestandardowy komponent HTML z całkowicie hardkodowanym tytułem
export default function HTML(props) {
  // ZAWSZE używamy bezpiecznego, hardkodowanego tytułu - nigdy nie pozwalamy na tytuł 404
  const SITE_TITLE = "Kowalstwo Artystyczne - Tadeusz Karny";
  
  // Usuwamy wszystkie tagi <title> z props.headComponents
  const filteredHeadComponents = Array.isArray(props.headComponents) 
    ? props.headComponents.filter(comp => 
        !(comp && 
          (comp.type === 'title' || 
           (typeof comp.type === 'string' && comp.type.toLowerCase() === 'title'))
        )
      )
    : [];

  return (
    <html {...props.htmlAttributes}>
      <head>
        {/* Podstawowe meta tagi */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* HARDKODOWANY TYTUŁ - nie pozwala NIGDY na pokazanie tytułu 404 */}
        <title key="fixed-title">{SITE_TITLE}</title>
        
        {/* Skrypt blokujący WSZELKIE próby zmiany tytułu na 404 */}
        <script
          key="hardened-title-protection"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Ustaw tytuł natychmiast
                document.title = "${SITE_TITLE}";
                
                // Całkowicie zastąp domyślną implementację właściwości document.title
                Object.defineProperty(document, 'title', {
                  get: function() { 
                    return "${SITE_TITLE}"; 
                  },
                  set: function(newValue) {
                    // Jeśli nowa wartość zawiera 404, ignoruj zmianę
                    if (newValue.includes('404') || 
                        newValue.toLowerCase().includes('nie znaleziono') ||
                        newValue.toLowerCase().includes('not found') ||
                        newValue.toLowerCase().includes('strona nie istnieje')
                       ) {
                      console.log('Zablokowano zmianę tytułu na:', newValue);
                      return "${SITE_TITLE}";
                    }
                    
                    // W przeciwnym razie pozwól na zmianę
                    // Ale zaraz po niej sprawdź jeszcze raz
                    const actualTitle = document.querySelector('title');
                    if (actualTitle) {
                      actualTitle.textContent = newValue;
                      
                      // Weryfikacja po zmianie
                      setTimeout(function() {
                        if (actualTitle.textContent.includes('404')) {
                          actualTitle.textContent = "${SITE_TITLE}";
                        }
                      }, 0);
                    }
                    
                    return newValue;
                  },
                  configurable: false // Uniemożliwia dalsze modyfikacje tej właściwości
                });
                
                // Dodatkowa ochrona - zatrzymaj oryginalne implementacje
                const originalCreateElement = document.createElement.bind(document);
                document.createElement = function(tagName, options) {
                  const element = originalCreateElement(tagName, options);
                  
                  // Jeśli tworzony jest element title, przeładuj jego metody
                  if (tagName.toLowerCase() === 'title') {
                    Object.defineProperty(element, 'textContent', {
                      set: function(value) {
                        // Zablokuj nieprawidłowe tytuły
                        if (value.includes('404') || 
                            value.toLowerCase().includes('nie znaleziono') ||
                            value.toLowerCase().includes('not found') ||
                            value.toLowerCase().includes('strona nie istnieje')
                           ) {
                          element.innerText = "${SITE_TITLE}";
                          return;
                        }
                        element.innerText = value;
                      },
                      get: function() {
                        return element.innerText;
                      }
                    });
                  }
                  
                  return element;
                };
                
                // Sprawdzaj title co 50ms przez pierwsze 5 sekund
                const interval = setInterval(function() {
                  const title = document.querySelector('title');
                  if (title) {
                    const currentTitle = title.textContent;
                    if (currentTitle.includes('404') || 
                        currentTitle.toLowerCase().includes('nie znaleziono') ||
                        currentTitle.toLowerCase().includes('not found') ||
                        currentTitle.toLowerCase().includes('strona nie istnieje')
                       ) {
                      title.textContent = "${SITE_TITLE}";
                    }
                  }
                }, 50);
                
                // Zatrzymaj interwat po 5 sekundach
                setTimeout(function() { clearInterval(interval); }, 5000);
              })();
            `,
          }}
        />
        
        {/* Przefiltrowane komponenty głowy bez tytułu */}
        {filteredHeadComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
