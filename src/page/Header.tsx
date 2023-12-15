import { Button } from "element-react";
import { IHeader } from './type';



export const Header = (Props:IHeader):JSX.Element => {

  return (
    <div className="header">
      <div className="title">
        <Button type="primary">JSON生成器</Button>
      </div>
      <div className="group">
        <Button type="success" onClick={Props.onClick}>生成JSON</Button>
        <Button type="warning">介绍</Button>
      </div>
    </div>
  )
}