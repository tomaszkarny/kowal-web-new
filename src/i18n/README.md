# i18n System

Ten katalog zawiera narzędzia do pracy z tłumaczeniami w projekcie.

## Struktura

- `aboutKeys.ts`, `commonKeys.ts`, itd. - Wygenerowane enumy TypeScript dla każdego namespace'u tłumaczeń
- `index.ts` - Eksportuje wszystkie enumy
- `translationKeys.json` - Zawiera wszystkie klucze tłumaczeń w formacie JSON
- `utils.ts` - Narzędzia pomocnicze do pracy z tłumaczeniami

## Użycie w komponentach

### Przykład 1: Z użyciem enumów TypeScript

```tsx
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

export default Header;
```

### Przykład 2: Z użyciem typowanych hooków

```tsx
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

export default Header;
```

## Aktualizacja kluczy tłumaczeń

Gdy dodajesz lub zmieniasz klucze tłumaczeń w plikach JSON, musisz zaktualizować enumy TypeScript:

```bash
npm run i18n:generate
```

## Sprawdzanie poprawności tłumaczeń

Aby sprawdzić, czy wszystkie pliki tłumaczeń zawierają te same klucze:

```bash
npm run i18n:audit
```

## Pełna weryfikacja i regeneracja

Aby wykonać pełną weryfikację i regenerację kluczy tłumaczeń:

```bash
npm run i18n:check
```
