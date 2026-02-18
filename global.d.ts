type ObjectId = string

type Env = 'test' | 'development' | 'production' | 'preprod' | 'build' | 'ci'

type MaybeArray<T> = T | T[]
type MaybePromise<T> = T | Promise<T>

type HasKeys<T> = keyof T extends never ? false : true

type FunctionGeneric = (...params: any[]) => any
type ObjectGeneric = { [k: string]: any }

type ObjectWithNoFn = { [name: string]: NotFunction<any> }

// eslint-disable-next-line @typescript-eslint/ban-types
type NotFunction<T> = T extends Function ? never : T

type AsType<T, Type> = T extends Type ? T : Type

type AsString<T> = AsType<T, string>

type Complete<T> = {
  [P in keyof Required<T>]: T[P];
}


type Override<T1, T2> = Omit<T1, keyof T2> & T2

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
  ? RecursivePartial<U>[]
  : T[P] extends object
  ? RecursivePartial<T[P]>
  : T[P];
}

type RecursiveRequired<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
  ? RecursiveRequired<U>[]
  : T[P] extends object
  ? RecursiveRequired<T[P]>
  : T[P];
}

type Letters = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

type SimpleNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

type ArrayOneOrMore<T> = { 0: T } & Array<T>

type RecursiveObjValueType<T, Type> = {
  [K in keyof T]?: T[K] extends object
  ? Type | RecursiveObjValueType<T[K], Type>
  : Type;
}

type TypeObjectValues<Obj extends Record<string, any>, Type> = {
  [K in keyof Obj]: Type;
}


/** Return true | false whenever an object has a property of type U */
type HasPropertyOfType<Objectt extends Record<string, any>, ExpectedType> = {
  [K in keyof Objectt]: Objectt[K] extends ExpectedType ? true : never;
}[keyof Objectt] extends never
  ? false
  : true

// https://stackoverflow.com/questions/49580725/is-it-possible-to-restrict-typescript-object-to-contain-only-properties-defined
type NoExtraProperties<T, U extends T = T> = U &
  MakeObjKeysAsNever<Exclude<keyof U, keyof T>>
type MakeObjKeysAsNever<K extends keyof any> = { [P in K]: never }

type RemoveTypeFromTuple<T, TypeToRemove> = T extends []
  ? []
  : T extends TypeToRemove
  ? []
  : T extends [infer A, ...infer R]
  ? [
    ...RemoveTypeFromTuple<A, TypeToRemove>,
    ...RemoveTypeFromTuple<R, TypeToRemove>
  ]
  : [T]

type GetTypeKeyFromObject<ObjType, Type> = {
  [P in keyof ObjType]: ObjType[P] extends Type ? never : P;
}[keyof ObjType]

/** Remove object key/values that are of a certain type */
type RemoveTypeFromObj<ObjType, Type> = Pick<
  ObjType,
  GetTypeKeyFromObject<ObjType, Type>
>


/** Get keys where the key type (number, string, Symbol...) is of Type */
type GetObjectKeysThatAreOfType<ObjType, Type> = {
  [P in keyof ObjType]: P extends Type ? P : never
}[keyof ObjType]

/** Remove Symbol and number from Object type */
type ForceStringKeyObject<Obj extends Record<any, any>> = Pick<
  Obj,
  GetObjectKeysThatAreOfType<Obj, string>
>


/** Get all indices of an array as a type. Eg: 0 | 1 | 2... */
type Indices<T extends readonly any[]> = Exclude<
  Partial<T>['length'],
  T['length']
>

/** Remove Readonly Modifier */
type Writeable<T> = { -readonly [P in keyof T]: T[P] }
/** Remove Readonly Modifier Recursively */
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

/** used to type generic function without having to do (...params: any) => any */
type GenericFunction = (...params: any[]) => any
/** used like IsObject<ReturnType> extends true ? .... */
type IsObject<T, ConsiderDateAndRegexpsAsObjects = false> = T extends Record<string, any>
  ? T extends GenericFunction ? false
  : T extends (any[] | readonly any[]) ? false
  : ConsiderDateAndRegexpsAsObjects extends false ? T extends (Date | RegExp) ? false
  : true
  : true
  : false

type ReadonlyDeep<T> = {
  readonly [P in keyof T]: IsObject<T[P]> extends true
  ? ReadonlyDeep<T[P]>
  : T[P];
}

/** Equivalent of { myPropA: string, otherProp?: never } | { myPropA?: never, otherProp: string }. This would be written Exclusive<{ myPropA: string },  {  otherProp: string }> */
type Exclusive<
  A extends Record<string, any>,
  B extends Record<string, any>,
  C extends Record<string, any> = {},
  D extends Record<string, any> = {},
  E extends Record<string, any> = {}
> =
  | ({
    [P in Exclude<keyof A | keyof C | keyof D | keyof E, keyof B>]?: never;
  } & B)
  | ({
    [P in Exclude<keyof B | keyof C | keyof D | keyof E, keyof A>]?: never;
  } & A)
  | ({
    [P in Exclude<keyof B | keyof A | keyof D | keyof E, keyof C>]?: never;
  } & C)
  | ({
    [P in Exclude<keyof B | keyof A | keyof C | keyof E, keyof D>]?: never;
  } & D)
  | ({
    [P in Exclude<keyof B | keyof A | keyof C | keyof D, keyof E>]?: never;
  } & E)

type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6

type StringAndUnion<T> = T | (string & {})

type ArrayKeys<Arr extends any[] | readonly any[]> = keyof Arr & number




type PropsIntersection<T> = (T extends any ? (x: T) => void : never) extends (x: infer R) => void ? R : never

/** Giving a list of object, this will return a type similar to O1 & O2 & O3...
  * * It works well when with this structure ```type ObjOfObj = Record<string, Record<string>>```
  * * Giving that structure, if you want to extract ```ObjOfObj[keyof ObjOfObj]``` the type may
be never because its impossible to match O1 | O2...
 */
type MergeMultipleObjects<Obj extends Record<string, any>> = PropsIntersection<Obj[keyof Obj]>




/** Giving a list of required fields and subfields (dot notation) this type will return the object with the required fields added to type.
@example 
```ts
type Obj = {
  a: string;
  aOptional?: string;
  b: {
    c?: string
    d?: string
    e: string
  }
}

type RequiredFields = {
  aOptional: true
  'b.c': true
}

type Result = AddRequiredFieldsToObject<Obj, RequiredFields>

// PARSED TYPE:
type Obj = {
  a: string
  aOptional: string // this has became required because we specified it in RequiredFields
  b: {
    c: string // ALSO did this field
    d?: string // this one has kept being optional
    e: string //       " "        " "     required
  }
}
```
 */
type AddRequiredFieldsToObject<Obj extends Record<string, any>, RequiredFields extends Record<string, boolean>> = RemoveTypeFromObj<Required<{
  [K in keyof Obj]:
  K extends string
  // ? Obj[K] extends any[] | readonly any[] ? Obj[K] :
  ? K extends keyof RequiredFields
  ? (RequiredFields[K] extends true
    ? IsObject<Obj[K]> extends true
    ? AddRequiredFieldsToObject<Obj[K], {
      [P in keyof RequiredFields as P extends `${K}.${infer R}` ? R : never]: RequiredFields[P];
    }>
    : Obj[K]
    : never)
  : never
  : never
}>, never> &
  RemoveTypeFromObj<{
    [K in keyof Obj]:
    K extends string
    // ? Obj[K] extends any[] | readonly any[] ? Obj[K] :
    ? K extends keyof RequiredFields
    ? never
    : IsObject<Obj[K]> extends true
    ? AddRequiredFieldsToObject<Obj[K], {
      [P in keyof RequiredFields as P extends `${K}.${infer R}` ? R : never]: RequiredFields[P];
    }>
    : Obj[K]
    : never
  }, never>


/**
 * Removes the first element from a tuple type.
 *
 * @example
 * ```ts
 * type Example1 = RemoveFirst<[boolean, number, string]>; // [number, string]
 * type Example2 = RemoveFirst<[boolean, string]>; // [string]
 * type Example3 = RemoveFirst<[boolean]>; // []
 * type Example4 = RemoveFirst<[]>; // never
 * ```
 */
type RemoveFirstElementFromTuple<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
