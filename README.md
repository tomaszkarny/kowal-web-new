# Kowal Web - Strona Kowalstwa Artystycznego

Strona internetowa prezentująca artystyczne kowalstwo, z sekcjami dla Strony głównej, O nas, Galerii i Kontaktu.

## Technologie

- **Gatsby (React)** – generowanie statycznej strony
- **Emotion** – stylizacja (CSS-in-JS)
- **GraphQL** – pobieranie danych (np. obrazy, metadane)
- **Netlify** – hosting i obsługa formularzy

## Rozwój lokalny

Aby uruchomić projekt lokalnie:

```bash
# Instalacja zależności
npm install --legacy-peer-deps

# Uruchomienie serwera deweloperskiego
npm run develop
```

Strona będzie dostępna pod adresem `http://localhost:8000`.

## Struktura projektu

- `src/components/` - Komponenty React
- `src/pages/` - Strony Gatsby
- `src/assets/` - Zasoby statyczne (obrazy, itp.)
- `locales/` - Pliki tłumaczeń
- `src/i18n/` - Narzędzia do pracy z tłumaczeniami

## i18n Workflow

Projekt obsługuje internacjonalizację (i18n) z polskim (pl) i angielskim (en) jako dostępnymi językami. Wszystkie tłumaczenia są zarządzane w katalogu `locales/`, z podkatalogami dla każdego języka.

### Struktura plików tłumaczeń

```
locales/
├── pl/
│   ├── common.json    # Wspólne tłumaczenia używane na wielu stronach
│   ├── about.json     # Tłumaczenia dla strony "O nas"
│   ├── gallery.json   # Tłumaczenia dla strony "Galeria"
│   ├── contact.json   # Tłumaczenia dla strony "Kontakt"
│   └── footer.json    # Tłumaczenia dla stopki
└── en/
    ├── common.json
    ├── about.json
    ├── gallery.json
    ├── contact.json
    └── footer.json
```

### Dodawanie nowych kluczy tłumaczeń

1. Dodaj nowy klucz i jego tłumaczenie do odpowiedniego pliku w katalogu `locales/pl/`
2. Dodaj ten sam klucz z tłumaczeniem angielskim w odpowiednim pliku w katalogu `locales/en/`
3. Uruchom skrypt walidacyjny, aby upewnić się, że wszystkie klucze są spójne:

```bash
npm run i18n:check
```

4. Po dodaniu kluczy, wygeneruj aktualizowane enumy TypeScript:

```bash
npm run i18n:generate
```

### Używanie tłumaczeń w komponentach

#### Przykład 1: Z użyciem enumów TypeScript

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CommonKeys } from '../i18n';

const Header = () => {
  const { t } = useTranslation('common');
  
  return (
    <header>
      <h1>{t(CommonKeys.siteTitle)}</h1>
      <p>{t(CommonKeys.siteDescription)}</p>
    </header>
  );
};
```

#### Przykład 2: Z użyciem typowanych hooków

```jsx
import React from 'react';
import { useCommonTranslation } from '../i18n/utils';

const Header = () => {
  const { t } = useCommonTranslation();
  
  return (
    <header>
      <h1>{t('siteTitle')}</h1>
      <p>{t('siteDescription')}</p>
    </header>
  );
};
```

### Dostępne skrypty

- `npm run i18n:audit` - Sprawdza, czy wszystkie klucze istnieją w obu językach
- `npm run i18n:validate` - Waliduje pliki tłumaczeń względem schematów JSON
- `npm run i18n:generate` - Generuje enumy TypeScript dla kluczy tłumaczeń
- `npm run i18n:check` - Uruchamia kompletną walidację i18n
- `npm run i18n:check:generate` - Uruchamia walidację i generuje enumy TypeScript

### Automatyczna walidacja

Projekt jest skonfigurowany z git pre-commit hookiem, który automatycznie waliduje pliki tłumaczeń przed każdym commitem. Jeśli pliki tłumaczeń zawierają błędy (np. brakujące klucze), commit zostanie zablokowany.
