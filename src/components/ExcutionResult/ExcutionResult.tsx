import { useEffect, useMemo, useState } from 'react';
import { ErrorPre, Wrapper, NetworkConment } from './ExcutionResult.styles';
import { useExampleInput, useExampleOutput } from '@/store/store';
import ResultTable from '@/components/ResultTable';
import { useUpdateIsRunning } from '@/store/codeStroe';
import openSnackBar from '@/utils/openSnackBar';
import { useSocket } from '@/context/SocketContext';

interface ResultInfo {
  input: string;
  output: string;
  result: string | null;
}

const NetwortLodingIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={24}>
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="#2d3339"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      <path
        d="M 8 1 A 7 7 0 0 1 15 8"
        stroke="#388bfd"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 8 8"
          to="360 8 8"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M 8 5 L 8 11 M 5 8 L 11 8"
        stroke="#8b949e"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

const createResultArray = (
  inputArr: string[],
  outputArr: string[],
  excuteResultArr: string[] | null[],
): ResultInfo[] => {
  const resultArray: ResultInfo[] = Array(excuteResultArr.length);

  for (let i = 0; i < excuteResultArr.length; i++) {
    const input = inputArr[i];
    const output = outputArr[i];
    const result = excuteResultArr[i] === null ? null : excuteResultArr[i];

    resultArray[i] = { input, output, result };
  }

  return resultArray;
};

function ExcutionResult() {
  const [error, setError] = useState<string | null>(null);
  const [excuteResult, setExcuteResult] = useState<string[] | null[]>([]);

  const { socket, isSocketConnect } = useSocket();
  const exampleInput = useExampleInput();
  const exampleOutput = useExampleOutput();
  const updateRunningState = useUpdateIsRunning();

  const resultTables = useMemo(() => {
    const resultArray = createResultArray(
      exampleInput,
      exampleOutput,
      excuteResult,
    );

    return resultArray.map((info, index) => (
      <ResultTable key={index} {...info} />
    ));
  }, [excuteResult]);

  useEffect(() => {
    if (socket !== null) {
      socket.on('start', (data) => {
        setError(null);
        setExcuteResult(data);
      });

      socket.on('output', (data) => {
        setExcuteResult(data);

        if (
          data.every((elem: string[] | null[]) => elem !== null) ||
          error !== null
        ) {
          updateRunningState(false);
        }
      });

      socket.on('warning', (data) => {
        openSnackBar(data);
        setError(null);
        setExcuteResult([]);
        updateRunningState(false);
      });

      socket.on('error', (data) => {
        setError(data);
        updateRunningState(false);
      });
    }
  }, [socket]);

  return (
    <Wrapper>
      {!isSocketConnect ? (
        <NetworkConment>
          {NetwortLodingIcon()} 네트워크 연결중 ...
        </NetworkConment>
      ) : null}
      {error === null && excuteResult.length === 0 ? (
        <h3>여기에 실행 결과가 표시됩니다.</h3>
      ) : error !== null ? (
        <ErrorPre>{error}</ErrorPre>
      ) : (
        resultTables
      )}
    </Wrapper>
  );
}

export default ExcutionResult;
