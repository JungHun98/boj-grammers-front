import { ReactNode, Component } from 'react';
import { ErrorContainer, ErrorTitle } from './GlobalErrorBoundary.styles';
import { Button } from '../Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string | null;
}

class GlobalErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: null };
  }

  componentDidCatch(error: Error) {
    console.error('에러', error.message);
    const message = '알수없는 에러가 발생했습니다. 😢';

    this.setState({ hasError: true, message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>{this.state.message}</ErrorTitle>
          <Button onClick={() => window.location.reload()}>새로고침</Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
