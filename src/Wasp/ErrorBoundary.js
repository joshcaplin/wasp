import React from 'react';
import './Wasp.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                  <p className="text-danger">An unexpected error occured, cannot display sortable list.</p>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
