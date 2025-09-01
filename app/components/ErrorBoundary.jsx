import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
          <div className="bg-slate-800/60 backdrop-blur-xl border border-red-500/30 rounded-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Oops! Terjadi Kesalahan</h2>
            <p className="text-gray-300 mb-6">
              Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu dan sedang memperbaikinya.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg hover:from-red-400 hover:to-red-500 focus:from-red-400 focus:to-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 font-semibold"
              >
                Muat Ulang Halaman
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-slate-700 text-gray-300 py-3 px-4 rounded-lg hover:bg-slate-600 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors font-medium"
              >
                Kembali
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                  Detail Error (Development)
                </summary>
                <div className="mt-2 p-3 bg-slate-900/50 rounded border border-slate-600 text-xs text-red-300 font-mono overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;