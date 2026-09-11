import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MutuaMente uncaught render error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#545454] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E5B468]/60 shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3E7] text-[#CD8E33] flex items-center justify-center mx-auto text-xl font-serif">
              M
            </div>
            <h1 className="font-serif-display text-2xl text-[#545454]">MutuaMente Psicologia</h1>
            <p className="text-sm text-stone-600">
              Ocorreu um problema temporário ao carregar esta secção.
            </p>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="w-full py-2.5 px-4 bg-[#CD8E33] hover:bg-[#B57827] text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
