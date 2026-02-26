'use client';

import React from 'react';

/**
 * Error Boundary for Redux Store Initialization
 * 
 * Catches errors during Redux hydration from localStorage
 * Prevents app crashes from corrupted/malformed persisted data
 * 
 * Usage:
 * Wrap ReduxProvider in layout.js with this component
 * 
 * Features:
 * - Automatically clears corrupted localStorage data
 * - Provides user-friendly error UI with retry option
 * - Logs errors for debugging
 */
export class ReduxErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state to trigger fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('Redux Error Boundary caught an error:', error, errorInfo);

        // Clear potentially corrupted localStorage data
        try {
            localStorage.removeItem('cartData');
            console.log('Cleared corrupted cart data from localStorage');
        } catch (e) {
            console.error('Failed to clear localStorage:', e);
        }
    }

    handleRetry = () => {
        // Reset error state and force re-mount
        this.setState({ hasError: false, error: null });
        
        // Force a page reload to re-initialize the store
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    <div style={{
                        maxWidth: '500px',
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>
                        <h1 style={{
                            fontSize: '24px',
                            color: '#dc3545',
                            marginBottom: '16px'
                        }}>
                            ⚠️ Application Error
                        </h1>
                        
                        <p style={{
                            fontSize: '16px',
                            color: '#6c757d',
                            marginBottom: '24px',
                            lineHeight: '1.5'
                        }}>
                            We encountered an issue loading your data. This usually happens when stored data becomes corrupted.
                            We've cleared the corrupted data, and you can try again.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details style={{
                                marginBottom: '24px',
                                textAlign: 'left',
                                padding: '12px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px',
                                fontSize: '14px',
                                color: '#495057'
                            }}>
                                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                    Error Details (Dev Only)
                                </summary>
                                <pre style={{
                                    marginTop: '12px',
                                    overflow: 'auto',
                                    fontSize: '12px'
                                }}>
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}

                        <button
                            onClick={this.handleRetry}
                            style={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: '#007bff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                            Reload Page
                        </button>

                        <p style={{
                            marginTop: '20px',
                            fontSize: '14px',
                            color: '#6c757d'
                        }}>
                            If this problem persists, please contact support.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
