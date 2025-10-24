import {Component, type ReactNode, type ErrorInfo} from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false,
    };


    public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return {hasError: true};
    }


    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Caught by ErrorBoundary:", error, errorInfo);
    }

    public render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div style={{padding: "1rem", backgroundColor: "#ffeeee", color: "#cc0000"}}>
                    <h1>Something went wrong.</h1>
                    <p>Please try refreshing the page or contact support.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;