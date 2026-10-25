import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-6 text-center font-sans">
          <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl border border-stone-200">
            <h1 className="text-2xl font-bold text-emerald-950 mb-3">Mosquée SALEM</h1>
            <p className="text-stone-600 text-sm mb-6">
              Une mise à jour est en cours. Veuillez actualiser la page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
            >
              Actualiser le site
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
