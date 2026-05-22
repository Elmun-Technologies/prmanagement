import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
          <div className="glass-card p-8 max-w-md text-center">
            <p className="text-4xl mb-4">⚠️</p>
            <h1 className="text-white font-bold text-lg mb-2">Xatolik yuz berdi</h1>
            <p className="text-gray-400 text-sm mb-4">{this.state.error.message}</p>
            <button
              type="button"
              className="btn-gold"
              onClick={() => {
                localStorage.removeItem('moysklad-launch-store');
                window.location.reload();
              }}
            >
              Ma&apos;lumotlarni tozalash va qayta yuklash
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
