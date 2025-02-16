import { FormEventHandler, useRef } from 'react';
import {
  ProblemNumberInput,
  ProblemSearchButton,
  Wrapper,
} from './ProblemSearch.style';
import { useProblemActions } from '@/store/store';
import { useIsRunning } from '@/store/codeStroe';
import openSnackBar from '@/utils/openSnackBar';
import snackbarMessage from '@/utils/consts/snackbarMessage';

function ProblemSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isRunning = useIsRunning();
  const { updateProblemNumber } = useProblemActions();

  const placeholderText = '백준 문제 번호를 입력해주세요.';

  const handleSearch = () => {
    if (inputRef.current === null) return;

    const inputValue = inputRef.current.value;
    const isContainNan = isNaN(+inputValue) || inputValue.trim().length === 0;

    if (isContainNan) {
      openSnackBar(snackbarMessage['isContainNaN']);
      return;
    }

    updateProblemNumber(+inputValue);
  };

  const handleSubmitSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isRunning) {
      openSnackBar(snackbarMessage['isRunning']);
      return;
    }

    handleSearch();
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmitSearch}>
        <ProblemNumberInput placeholder={placeholderText} ref={inputRef} />
        <ProblemSearchButton type="submit">
          <img src="/search.svg" alt="검색" width={24} />
        </ProblemSearchButton>
      </form>
    </Wrapper>
  );
}

export default ProblemSearch;
