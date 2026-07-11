import React, { useCallback } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import {
  FilterBarOuter,
  FilterBarInner,
  PrimaryRow,
  SubRow,
  FilterPill,
  SubFilterPill,
  CountBadge,
  LiveRegion,
} from './GalleryFilterBar.styles'

/**
 * Map primary category keys to their i18n translation keys.
 * The categories array comes from the parent (derived from image data).
 */
const CATEGORY_LABEL_KEY = {
  all: 'categories.all',
  gates: 'categories.gates',
  balustrades: 'categories.balustrades',
  fences: 'categories.fences',
  decorative_elements: 'categories.decorative_elements',
}

/**
 * Ordered display sequence for primary pills.
 * Categories not listed here will be appended at the end.
 */
const PREFERRED_ORDER = ['all', 'balustrades', 'gates', 'fences', 'decorative_elements']

const SUB_CATEGORIES = [
  { key: 'balustrades', label: 'categories.balustrades' },
  { key: 'balustrades-interior', label: 'subcategories.balustrades.interior' },
  { key: 'balustrades-exterior', label: 'subcategories.balustrades.exterior' },
]

/**
 * GalleryFilterBar
 *
 * Props:
 *   activeCategory   — currently selected category string
 *   onCategoryChange — callback(newCategory: string) => void
 *   categories       — string[] of available category keys (e.g. ['all', 'gates', ...])
 *   imageCounts      — Record<string, number> of counts per category
 */
export function GalleryFilterBar({
  activeCategory,
  onCategoryChange,
  categories,
  imageCounts,
}) {
  const { t } = useTranslation('gallery')

  // Sort categories by preferred order
  const orderedCategories = React.useMemo(() => {
    const preferred = PREFERRED_ORDER.filter(k => categories.includes(k))
    const rest = categories.filter(k => !PREFERRED_ORDER.includes(k))
    return [...preferred, ...rest]
  }, [categories])

  const showSubRow = activeCategory === 'balustrades' ||
    activeCategory === 'balustrades-interior' ||
    activeCategory === 'balustrades-exterior'

  const handleKeyDown = useCallback(
    (e, key) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onCategoryChange(key)
      }
    },
    [onCategoryChange]
  )

  const totalShowing = imageCounts?.[activeCategory] ?? imageCounts?.all ?? 0

  return (
    <FilterBarOuter>
      {/* Visually hidden live region for screen readers */}
      <LiveRegion aria-live="polite" aria-atomic="true">
        {t('filterBar.showing', { count: totalShowing, defaultValue: `Showing ${totalShowing} images` })}
      </LiveRegion>

      <FilterBarInner>
        {/* Primary category pills */}
        <PrimaryRow
          role="tablist"
          aria-label={t('filterBar.ariaLabel', 'Filter gallery by category')}
        >
          {orderedCategories.map(key => {
            const pillActive = activeCategory === key
            const count = imageCounts?.[key]
            const label = CATEGORY_LABEL_KEY[key]
              ? t(CATEGORY_LABEL_KEY[key], key)
              : key

            return (
              <FilterPill
                key={key}
                role="tab"
                aria-selected={pillActive}
                isActive={pillActive}
                data-active={pillActive ? 'true' : 'false'}
                onClick={() => onCategoryChange(key)}
                onKeyDown={e => handleKeyDown(e, key)}
                tabIndex={pillActive ? 0 : -1}
              >
                {label}
                {count !== undefined && (
                  <CountBadge aria-hidden="true">{count}</CountBadge>
                )}
              </FilterPill>
            )
          })}
        </PrimaryRow>

        {/* Sub-category row — slides in when balustrades is active */}
        <SubRow
          isVisible={showSubRow}
          role="tablist"
          aria-label={t('subcategories.balustrades.ariaLabel', 'Filter balustrades')}
          aria-hidden={!showSubRow}
        >
          {SUB_CATEGORIES.map(({ key, label }) => {
            const count = imageCounts?.[key]
            return (
              <SubFilterPill
                key={key}
                role="tab"
                aria-selected={activeCategory === key}
                isActive={activeCategory === key}
                onClick={() => onCategoryChange(key)}
                onKeyDown={e => handleKeyDown(e, key)}
                tabIndex={showSubRow && activeCategory === key ? 0 : -1}
              >
                {t(label, key)}
                {count !== undefined && (
                  <CountBadge aria-hidden="true">{count}</CountBadge>
                )}
              </SubFilterPill>
            )
          })}
        </SubRow>
      </FilterBarInner>
    </FilterBarOuter>
  )
}
