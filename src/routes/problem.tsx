import Header from '@/components/Header';
import MainContent from '@/components/MainContent';
import ButtonSection from '@/components/ButtonSection';
import styled from '@emotion/styled';
import { CodeProvider } from '@/context/CodeContext';
import { SocketProvider } from '@/context/SocketContext';

interface ProblemProps {
  onOpen: () => void;
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #263747;
`;

const Problem = ({ onOpen }: ProblemProps) => {
  return (
    <Wrapper>
      <SocketProvider>
        <Header />
        <CodeProvider>
          <MainContent />
          <ButtonSection onOpen={onOpen} />
        </CodeProvider>
      </SocketProvider>
    </Wrapper>
  );
};

export default Problem;
