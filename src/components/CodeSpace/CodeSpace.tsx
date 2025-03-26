import CodeMirror from '@uiw/react-codemirror';
import { copilot } from '@uiw/codemirror-theme-copilot';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { Wrapper } from './CodeSpace.style';
import { useLanguage } from '@/store/codeStroe';
import CopyBlock from '@/components/CopyBlock';
import { useCode } from '@/context/CodeContext';

function CodeSpace() {
  const lang = useLanguage();
  const codeSet = useCode();

  const handleInputCode = (value: string) => {
    codeSet[lang] = value;
  };

  return (
    <Wrapper>
      <CopyBlock lang={lang} />
      <CodeMirror
        value={codeSet[lang]}
        onChange={handleInputCode}
        theme={copilot}
        height="100%"
        extensions={[loadLanguage(lang)!]}
        basicSetup={{
          foldGutter: false,
          tabSize: 4,
        }}
      />
    </Wrapper>
  );
}

export default CodeSpace;
