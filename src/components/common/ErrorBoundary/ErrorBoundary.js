import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  render() {
    const { hasError } = this.state
    const { fallback = null, children } = this.props
    if (hasError) {
      // Fallback UI - render nothing instead of crashing
      return fallback
    }

    return children
  }
}

export { ErrorBoundary }