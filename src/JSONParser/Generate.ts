/* eslint-disable array-callback-return */
type TypeMenu = "[object Object]" | "[object Array]";
type MatchInstance = any;
type RandType = "Number" | "String" | "Src" | "ImgSrc";
type OT = { [index: string]: any; }
const RepeatRegExp = /@repeat(\(((?:\s)*#([a-zA-Z]*)(?:\s*),(?:\s*)(\d+)(?:\s*)\))|(\((?:\s*)(\d+)(?:\s*)\)))/i;
const StringRegExp = /#String\((\d+)\)/i;
const NumberRegExp = /#Number\((\d+)\)/i;
const SrcRegExp = /#src/i;
const ImageRegExp = /#imgSrc/i;
const ItemRegExp = /@Item/i;
const obj = {};               // result
export default function Generate(JSONStr: string): string {
  //解析模板
  const json = JSON.parse(JSONStr);
  //递归解析JSON对象 "@repeat(num)" | k : "#type" | k:[#repeat(type,num)]
  /**
   * @param RecursionObjects 递归对象
   * @param CurrentObject 当前文本拷贝
   * @param id @Item关键词替换
   */
  const dfs = (
      RecursionObjects: OT,
      CurrentObject: OT, 
      RepeatId?: number
    ) => {
    for (const ObjectKey in RecursionObjects) {
      //捕获"@repeat"
      const RepeatMatch = ObjectKey.match(RepeatRegExp);
      const ObjectValue = RecursionObjects[ObjectKey];
      //判断对象类型
      const ObjectKeyType = Object.prototype.toString.call(ObjectValue) as TypeMenu;
      //捕获成功
      if (RepeatMatch) {
        //获取对象赋值次数
        const iterate = parseInt(RegExp.$6);
        for (let it = 0; it < iterate; it++) {
          const RepeatObject = {} as never;
          //继续递归对象
          dfs(ObjectValue, RepeatObject, it);
          (CurrentObject as []).push(RepeatObject);
        }
      } else {
        //未捕获到@repeat关键词
        if (ObjectKeyType === "[object Object]") {
          CurrentObject[ObjectKey] = {};
          dfs(ObjectValue, CurrentObject[ObjectKey]);
        } else if (ObjectKeyType === "[object Array]") {
          // @repeat(#type,number);
          // 捕获数组中的关键词
          CurrentObject[ObjectKey] = [];
          if (typeof ObjectValue[0] === "string") {
            const matchIns = (ObjectValue[0] as string).match(RepeatRegExp);
            if (matchIns) {
              //获取捕获类型 目前有 imageSrc | Src
              const type = RegExp.$3 as string;
              const iterate = parseInt(RegExp.$4);
              for (let it = 0; it < iterate; it++)
                //获取类型随机值
                (CurrentObject[ObjectKey] as []).push(matchTxt(type) as never);
            } else
              (ObjectValue as []).map(arrV => { (CurrentObject[ObjectKey] as []).push(arrV) });
          }
          //继续遍历数组中的对象
          else (ObjectValue as []).map(arrV => { dfs(arrV, CurrentObject[ObjectKey]); });
        } else {
          //数字直接赋值
          if (typeof ObjectValue === "number") {
            CurrentObject[ObjectKey] = ObjectValue;
          } else {
            //捕获字符串关键词
            const RepeatItemId = ObjectValue.match(ItemRegExp);
            if (RepeatItemId)
              CurrentObject[ObjectKey] = RepeatId;
            else {
              const matchIns = matchTxt(ObjectValue);
              if (matchIns) CurrentObject[ObjectKey] = matchIns;
              else CurrentObject[ObjectKey] = ObjectValue;
            }
          }
        }
      }
    }
  }

  const matchTxt = (str: string): MatchInstance | null => {
    if(str === "imgSrc"){
      return rand("ImgSrc");
    }else if(str === "src"){
      return rand("Src");
    }
    const m1 = str.match(StringRegExp);
    if (m1) {
      const l = parseInt(m1[1]);
      return rand("String",l);
    }
    const m2 = str.match(NumberRegExp);
    if (m2) {
      const l = parseInt(m2[1]);
      return rand("Number",l);
    }
    const m3 = str.match(ImageRegExp);
    if (m3) {
      return rand("ImgSrc");
    }
    const m4 = str.match(SrcRegExp);
    if (m4) {
      return rand("Src");
    }
    return null;
  }

  const rand = (T: RandType, num?: number) => {
    if(T === "ImgSrc"){
      return "http://124.220.176.205:8080/image/96b3f57be93ec074cf1e98d134b36abe.jpg";
    }else if(T === "Src"){
      return "https://regexr.com/74kh0";
    }else if(T === "Number" && num){
      return Math.ceil(Math.random() * 998244353) % (10 ** num);
    }else if(T === "String" && num){
      const D = new Date().toString();
      return D;
    }
  }

  dfs(json, obj);

  return JSON.stringify(obj,null,"\t");
}