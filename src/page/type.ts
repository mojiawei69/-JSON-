export interface IHeader{
  onClick: () => void;
}

export interface IJSONGenerate{
  code ?:string;
  onChangeCode : (str : string) => void;
}

export interface IWatch{
  code:string
}