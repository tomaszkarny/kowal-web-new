/**
 * Utilities for working with translation keys
 */

import { useTranslation } from 'react-i18next';
import { 
  AboutKeys, 
  CommonKeys, 
  ContactKeys, 
  FooterKeys, 
  GalleryKeys 
} from './index';

// Type representing all available translation keys
export type TranslationKey = 
  | AboutKeys
  | CommonKeys
  | ContactKeys
  | FooterKeys
  | GalleryKeys;

/**
 * Strongly-typed hook for using translations
 * @param namespace The translation namespace
 * @returns Typed translation function and other i18n utilities
 */
export function useTypedTranslation<T extends string>(namespace: string) {
  const { t, i18n } = useTranslation(namespace);
  
  // Typed translation function
  const typedT = (key: T, options?: any) => t(key, options);
  
  return {
    t: typedT,
    i18n
  };
}

// Convenient namespace-specific hooks
export const useCommonTranslation = () => useTypedTranslation<CommonKeys>('common');
export const useAboutTranslation = () => useTypedTranslation<AboutKeys>('about');
export const useContactTranslation = () => useTypedTranslation<ContactKeys>('contact');
export const useFooterTranslation = () => useTypedTranslation<FooterKeys>('footer');
export const useGalleryTranslation = () => useTypedTranslation<GalleryKeys>('gallery');

/**
 * Example usage:
 * 
 * import { useCommonTranslation, CommonKeys } from 'src/i18n';
 * 
 * const MyComponent = () => {
 *   const { t } = useCommonTranslation();
 *   
 *   return <h1>{t(CommonKeys.title)}</h1>;
 * };
 */
