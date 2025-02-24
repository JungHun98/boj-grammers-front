import { Grid } from 'lucide-react';
import {
  NotFoundContainer,
  Content,
  ErrorCode,
  Message,
  BackButton,
} from './NotFound.styles';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <Grid />
      <Content>
        <ErrorCode>404</ErrorCode>
        <Message>PAGE NOT FOUND</Message>
        <BackButton onClick={() => navigate('/')}>BACK TO HOME</BackButton>
      </Content>
    </NotFoundContainer>
  );
}

export default NotFound;
