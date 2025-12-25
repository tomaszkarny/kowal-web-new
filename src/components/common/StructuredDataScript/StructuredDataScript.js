import React from 'react'

/**
 * StructuredDataScript Component
 * -------------------------------
 * Centralized component for rendering JSON-LD structured data scripts.
 * Consolidates 10+ files with inconsistent schema rendering patterns.
 *
 * Usage:
 *   <StructuredDataScript schema={mySchema} />
 *   <StructuredDataScript schemas={[schema1, schema2]} />
 *
 * @param {Object} props
 * @param {Object} props.schema - Single schema object to render
 * @param {Array} props.schemas - Array of schema objects to render
 * @param {string} props.id - Optional id attribute for the script tag
 */
export function StructuredDataScript({ schema, schemas, id }) {
  // Handle array of schemas
  if (schemas && Array.isArray(schemas)) {
    // Filter out null/undefined schemas
    const validSchemas = schemas.filter(Boolean)

    if (validSchemas.length === 0) {
      return null
    }

    return (
      <>
        {validSchemas.map((s, index) => (
          <script
            key={`structured-data-${id || index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </>
    )
  }

  // Handle single schema
  if (!schema || typeof schema !== 'object') {
    return null
  }

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default StructuredDataScript
