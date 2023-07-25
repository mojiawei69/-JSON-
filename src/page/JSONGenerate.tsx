import MonacoEditor from 'react-monaco-editor';
import "monaco-editor/esm/vs/language/json/monaco.contribution";
import { IJSONGenerate,IWatch } from './type';

//编辑器默认配置项
const _initOptions = {
  selectOnLineNumbers: true,
  renderSideBySide: false,
};

export const JSONGenerate = (Props:IJSONGenerate): JSX.Element => {
  return (
    <MonacoEditor
      width="49%"
      height="800"
      language="json"
      theme="vs-dark"
      value={""}
      options={Object.assign(
        _initOptions,
        { fontSize: 14 },
      )}
      onChange={(v, _) => Props.onChangeCode(v)}
    />
  )
}

export const JSONWatch = (Props: IWatch): JSX.Element => {
  return (
    <MonacoEditor
      width="49%"
      height="800"
      language="json"
      theme="vs-dark"
      value={Props.code}
      options={Object.assign(
        _initOptions,
        { fontSize: 14 },
      )}
    />
  )
}

