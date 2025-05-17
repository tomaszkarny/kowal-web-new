import React, { useEffect } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { navigate } from 'gatsby';

/**
 * Client-side language redirect.
 * - Reads preferences from localStorage ('language') or uses defaultLanguage.
 * - Doesn't add prefix for default language (in our case 'pl').
 * - Preserves query string and hash in the new URL.
 */
const Redirect = () => {
  const { originalPath, defaultLanguage } = useI18next();

  useEffect(() => {
    const stored = typeof window !== 'undefined' && window.localStorage.getItem('language');
    const detected = stored || defaultLanguage;

    if (typeof window !== 'undefined') {
      const needsPrefix = detected && detected !== defaultLanguage;
      const basePath = needsPrefix ? `/${detected}${originalPath}` : originalPath;

      const { search = '', hash = '' } = window.location;
      navigate(`${basePath}${search}${hash}`, { replace: true });
    }
  }, [originalPath, defaultLanguage]);

  return null;
};

export default Redirect;
