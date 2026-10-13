import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Database } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CELPIP Master 12 Caught Unhandled Application Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  private handleClearStorageAndReload = () => {
    try {
      localStorage.removeItem('celpip_simulation_bank');
      localStorage.removeItem('celpip_seen_ledger');
      localStorage.removeItem('celpip_attempts');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Session Recovery Protection
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  An unexpected display issue occurred. Your progress data is preserved.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 text-xs font-mono text-slate-300 overflow-x-auto max-h-32">
              {this.state.error?.message || 'Unknown render exception'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-sky-600/25 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Return to Dashboard
              </button>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
            </div>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>Having corrupted local simulation cache?</span>
              <button
                onClick={this.handleClearStorageAndReload}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                Restore Default Bank
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
