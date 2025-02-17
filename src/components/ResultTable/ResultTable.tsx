import Loder from '@/components/Loder';
import { Fail, Success, Table, TablePre } from './ResultTable.styles';

interface ResultTableProps {
  input: string;
  output: string;
  result: string | null;
}

function ResultTable({ input, output, result }: ResultTableProps) {
  const compareResult = () => {
    let outputArr = output.split('\n').filter((elem) => elem !== '');
    let resultArr = result!.split('\n').filter((elem) => elem !== '');

    outputArr = outputArr.map((elem) => elem.trim());
    resultArr = resultArr.map((elem) => elem.trim());

    return outputArr.join('\n') === resultArr.join('\n');
  };

  return (
    <Table>
      <tbody>
        <tr>
          <th>입력값</th>
          <td style={{ whiteSpace: 'pre-line' }}>
            <TablePre>{input}</TablePre>
          </td>
        </tr>
        <tr>
          <th>기댓값</th>
          <td style={{ whiteSpace: 'pre-line' }}>
            <TablePre>{output}</TablePre>
          </td>
        </tr>
        <tr>
          <th>실행 결과</th>
          {result === null ? (
            <td style={{ padding: 0 }}>
              <Loder />
            </td>
          ) : (
            <td style={{ whiteSpace: 'pre-line' }}>
              {compareResult() ? (
                <Success>테스트를 통과했습니다.</Success>
              ) : (
                <Fail>{result}</Fail>
              )}
            </td>
          )}
        </tr>
      </tbody>
    </Table>
  );
}

export default ResultTable;
