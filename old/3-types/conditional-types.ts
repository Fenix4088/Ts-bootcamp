
// type NonUndefinedT<T> = T extends undefined ? never : T;

import { param } from "jquery";

// const value: NonUndefinedT<string | number | undefined> = '';

type ExcludeFactIdT<T> = T extends 'factId' ? never : T;

interface IFact {
      factId: number;
      user: any;
      value: string;
}

const value: ExcludeFactIdT<keyof IFact> = 'factId';
//------------------------------------------------------------

interface IUser {
      name: string;
      age: number;
}

const arr: [()=>IUser, () => number | null] = [()=>({name: 'Andrew', age: 30}), ()=>null];

//Тут мы захватываем тип который возвращает ф-я, которая является 1-м элементом в массиве arr
// infer нужен для захвата значения
// в данном случае infer U захватывает тип 1-го элемента в массиве
// infer R захватывает тип возвращаемого элемента ф-и которая является U
type FirstElementReturnType<T> = T extends [infer U, ...unknown[]] ? U extends (...args: unknown[]) => infer R ? R : never : never;

const value2: FirstElementReturnType<typeof arr> = 'IUser'

//=================================================================================
// My own examples
// 1

interface IId {
      id: number
}

interface IName {
      name: string
}

type NameOrId<T extends number | string> = T extends number ? IId : IName;

function nameOrId <T extends number | string>(param: T): NameOrId<T> {
      if(typeof param === 'number') {
            return {id: 1} as NameOrId<T>;    
      } else {
            return {name: 'Dima'} as NameOrId<T>;
      } 
      
}

let inv1 = nameOrId('Ihor');
inv1.name
inv1.id
let inv2 = nameOrId(22);
inv2.name
inv2.id
//=================================================================================


function bar2(_a:string, _b: number): boolean {
      return true;
}

type NonFunction<T> = T extends Function ? never : T;  

type FunctionParamsAndReturn<T> = T extends (...args: infer ARGS) => infer R ? NonFunction<ARGS[keyof ARGS]> | R: never;
let foo2: FunctionParamsAndReturn<typeof bar2> = 2;