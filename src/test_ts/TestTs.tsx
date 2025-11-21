export default function TestTs() {
  let age: number | string = 30;
  let name: string = 'K-digital'
  let isStudent: boolean = true;

  let nums: number[] = [1, 2, 3];
  let nums2: Array<String> = ['1', '2', '3'];

  let arrTuple: [string, number] = ['Kdigital', 30];
  arrTuple[0] = 'pnu';

  interface Person {
    name: string,
    age: number
  };

  let person: Person = { name: 'pnu', age: 30 };

  let direction: 'right' | 'left' | 'up' | 'down' = 'right';

  type HandleMsg = (msg: string) => string;
  type HandleCick = () => void;

  const handleMsg: HandleMsg = (msg) => {
    return msg + '님 안녕하세요'
  }

  const handleClick: HandleCick = () => {
    console.log("handClick");
    console.log(handleMsg('kdigital'))
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">TypeScript 기본 문법</h1>
      <ul className="mt-10">
        <li>기본데이터타입 (string) : 이름 {name}</li>
        <li>기본데이터타입 (number) : 나이 {age}</li>
        <li>기본데이터타입 (boolean) : {isStudent ? '학생' : '일반인'}</li>
        <li>배열 : {nums.join(', ')}</li>
        <li>배열2 : {nums2.join(', ')}</li>
        <li>튜플 : 이름{arrTuple[0]}</li>
        <li>오브젝트 : 이름{person.name} 나이{person['age']}</li>
        <li>방향 : {direction}</li>
      </ul>
      <div>
        <button className="bg-amber-500" onClick={handleClick}>
          handleClick
        </button>
      </div>
    </div>
  );
}
