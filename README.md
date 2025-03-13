# typescript-generic-types

A comprehensive collection of useful TypeScript generic types to enhance your type-safety and development experience.

## Installation

```bash
npm install typescript-generic-types
# or
yarn add typescript-generic-types
```

## Usage

Simply import the package at the top of any file in your project:

```typescript
import 'typescript-generic-types'
```

## Available Types

### Basic Utility Types

#### `MaybeArray<T>`
Represents a value that could be either a single item or an array of items.
```typescript
type Example = MaybeArray<string>; // string | string[]
```

#### `MaybePromise<T>`
Represents a value that could be either the direct type or a Promise of that type.
```typescript
type Example = MaybePromise<number>; // number | Promise<number>
```

#### `FunctionGeneric`
A type-safe way to represent any function.
```typescript
const myFunc: FunctionGeneric = (...args) => console.log(args);
```

#### `ObjectGeneric`
Represents any object with string keys and any values.
```typescript
const obj: ObjectGeneric = { key: 'value' };
```

### Advanced Utility Types

#### `NotFunction<T>`
Ensures a type is not a function.

#### `AsType<T, Type>`
Forces a type to conform to another type if possible.

#### `Complete<T>`
Makes all properties of an object required and non-nullable.

#### `RecursivePartial<T>`
Makes all properties of an object (and its nested objects) optional.

#### `Override<T1, T2>`
Combines two types, with T2 properties overriding T1 properties.

### String and Array Types

#### `CountryCodeIso`
Represents ISO country codes (two letters).
```typescript
const country: CountryCodeIso = 'us'; // valid
const invalid: CountryCodeIso = 'usa'; // error
```

#### `ArrayOneOrMore<T>`
Ensures an array has at least one element.

#### `ArrayKeys<Arr>`
Gets the keys (indices) of an array as a type.

### Object Manipulation Types

#### `NoExtraProperties<T>`
Ensures an object only contains defined properties.

#### `RemoveTypeFromObj<ObjType, Type>`
Removes properties of a specific type from an object.

#### `ForceStringKeyObject<Obj>`
Ensures all object keys are strings.

#### `ReadonlyDeep<T>`
Makes an object and all its nested properties readonly.

### Special Types

#### `Exclusive<A, B, C, D, E>`
Creates mutually exclusive property sets.
```typescript
type Example = Exclusive<{propA: string}, {propB: number}>;
// Either has propA or propB, but not both
```

#### `WeekDays`
Type representing days of the week (0-6).

#### `Env`
Type for common environment names.
```typescript
const env: Env = 'production'; // Valid values: 'test' | 'development' | 'production' | 'preprod' | 'build' | 'ci'
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

