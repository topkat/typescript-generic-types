# typescript-generic-types

Just `import 'typescript-generic-types'` on a top of any files in your project.

It will expose global typescript generic types:

```typescript


type MaybeArray<T> = T | T[]
type MaybePromise<T> = T | Promise<T>

type FunctionGeneric = (...params: any[]) => any
type ObjectGeneric = { [k: string]: any }

type ObjectWithNoFn = { [name: string]: NotFunction<any> }

type NotFunction<T>

type AsType<T, Type> = T extends Type ? T : Type

type AsString<T> = AsType<T, string>

type Complete<T> = {
  [P in keyof Required<T>]: T[P];
}

type CountryCodeIso = `${Letters}${Letters}`
type TranslationObj = { [countryIsoCode in CountryCodeIso]?: string }

type Override<T1, T2>

type RecursivePartial<T>

type Letters = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

type SimpleNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

type ArrayOneOrMore<T>

type RecursiveObjValueType<T, Type>

type TypeObjectValues<Obj extends Record<string, any>, Type>

// https://stackoverflow.com/questions/49580725/is-it-possible-to-restrict-typescript-object-to-contain-only-properties-defined
type NoExtraProperties<T, U extends T = T>
type MakeObjKeysAsNever<K extends keyof any> = { [P in K]: never }

type RemoveTypeFromTuple<T, TypeToRemove>

type GetTypeKeyFromObject<ObjType, Type>

/** Remove object key/values that are of a certain type */
type RemoveTypeFromObj<ObjType, Type>


/** Get keys where the key type (number, string, Symbol...) is of Type */
type GetObjectKeysThatAreOfType<ObjType, Type>

/** Remove Symbol and number from Object type */
type ForceStringKeyObject<Obj extends Record<any, any>>


/** Get all indices of an array as a type. Eg: 0 | 1 | 2... */
type Indices<T extends readonly any[]>

/** Remove Readonly Modifier */
type Writeable<T>
/** Remove Readonly Modifier Recursively */
type DeepWriteable<T>
/** used to type generic function without having to do (...params: any) => any */
type GenericFunction //
/** used like IsObject<ReturnType> extends true ? .... */
type IsObject<T> 

type ReadonlyDeep<T>

/** Equivalent of { myPropA: string, otherProp?: never } | { myPropA?: never, otherProp: string }. This would be written Exclusive<{ myPropA: string },  {  otherProp: string }> */
type Exclusive<
  A extends Record<string, any>,
  B extends Record<string, any>,
  C extends Record<string, any> = {},
  D extends Record<string, any> = {},
  E extends Record<string, any> = {}
>

type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6

type StringAndUnion<T>

type ArrayKeys<Arr extends any[] | readonly any[]>

type Env = 'test' | 'development' | 'production' | 'preprod' | 'build' | 'ci'


```