import { Button } from '@/components/common/Button';
import useSocket from '@/hooks/useSocket';
import {
  useLanguage,
  useIsRunning,
  useUpdateIsRunning,
} from '@/store/codeStroe';
import { useExampleInput } from '@/store/store';
import { useCode } from '@/context/CodeContext';
import { css } from '@emotion/css';
import openSnackBar from '@/utils/openSnackBar';
import snackbarMessage from '@/utils/consts/snackbarMessage';

const style = css`
  background-color: #2d5a27;
  color: white;

  &: hover {
    background-color: #224a1d;
  }
`;

const containsDangerousCode = (inputString: string) => {
  // 위험한 패턴 목록
  const forbiddenPatterns = [
    /(system\s*\()|(popen\s*\()|(Runtime\.getRuntime\(\)\.exec)|ProcessBuilder|subprocess\.run|os\.system|child_process|execSync|spawn/,
    /eval\(/i, // eval() 호출
    /exec\(/i, // exec() 호출
    /rm\s+-rf/i, // rm -rf 명령어
    /process\.exec/i, // process.exec() 호출
    /Process/i,
    /invoke\(/i,
    /<filesystem>/i,
    /<cstdlib>/i,
    /import subprocess/i,
    /readdir/i,
  ];

  // 패턴 검사
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(inputString)) {
      return pattern; // 위험한 코드가 발견됨
    }
  }

  return false; // 안전한 코드
};

function CodeRunButton() {
  const socket = useSocket(import.meta.env.VITE_APP_URL);

  const lang = useLanguage();
  const code = useCode();
  const input = useExampleInput();
  const isRunning = useIsRunning();
  const updateIsRunning = useUpdateIsRunning();

  const handleClickButton = () => {
    const noSocket = socket === null;
    const isDangerousCode = containsDangerousCode(code[lang]);
    const isEmptyCode = code[lang].trim().length === 0;

    if (isRunning) {
      openSnackBar(snackbarMessage['isRunning']);
      return;
    }

    if (noSocket) {
      openSnackBar(snackbarMessage['noSocket']);
      return;
    }

    if (isDangerousCode) {
      openSnackBar(snackbarMessage['isDangerousCode']);
      return;
    }

    if (isEmptyCode) {
      openSnackBar(snackbarMessage['isEmptyCode']);
      return;
    }

    updateIsRunning(true);
    socket.emit('codeRun', { code: code[lang], lang, input });
  };

  return (
    <Button onClick={handleClickButton} className={style}>
      코드 실행
    </Button>
  );
}

export default CodeRunButton;
