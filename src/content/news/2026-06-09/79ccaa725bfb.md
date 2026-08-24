---
title: "TypeScript for JavaScript Developers: The Complete Practical Guide (2026)"
originalUrl: "https://dev.to/armorbreak/typescript-for-javascript-developers-the-complete-practical-guide-2026-27gj"
date: "2026-06-08T23:08:09.998Z"
---

# TypeScript for JavaScript Developers: The Complete Practical Guide (2026)

**TypeScript: The Practical Guide for JavaScript Developers (2026)**
TypeScript isn't just "JavaScript with types" — it's a superpower that catches bugs before they happen. Here's the practical guide to going from JS to TS.

**TypeScript：JavaScript 开发者的实用指南（2026）**
TypeScript 不仅仅是“带有类型的 JavaScript”——它更像是一种超能力，能在 Bug 发生前就将其捕获。以下是从 JS 转向 TS 的实用指南。

---

### Why TypeScript Matters
// JavaScript: The bug that only shows in production
```javascript
function calculateDiscount(price, isMember) {
  return price * (isMember ? 0.9 : 0.8); 
  // What if price is "100"? NaN!
}
```
// TypeScript: Caught at compile time
```typescript
function calculateDiscount(price: number, isMember: boolean): number {
  return price * (isMember ? 0.9 : 0.8);
}
calculateDiscount("100", true); // Error: Argument of type 'string' not assignable to 'number'
```

### 为什么 TypeScript 很重要
// JavaScript：只有在生产环境中才会暴露的 Bug
```javascript
function calculateDiscount(price, isMember) {
  return price * (isMember ? 0.9 : 0.8); 
  // 如果 price 是 "100" 会怎样？结果是 NaN！
}
```
// TypeScript：在编译阶段捕获错误
```typescript
function calculateDiscount(price: number, isMember: boolean): number {
  return price * (isMember ? 0.9 : 0.8);
}
calculateDiscount("100", true); // 错误：类型 'string' 的参数不能赋值给类型 'number'
```

---

### Type Basics
// Primitive types
```typescript
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let data: null = null;
let nothing: undefined = undefined;
```
// Arrays
```typescript
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];
// Read-only array
const config: readonly string[] = ["dev", "staging"];
```

### 类型基础
// 原始类型
```typescript
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let data: null = null;
let nothing: undefined = undefined;
```
// 数组
```typescript
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];
// 只读数组
const config: readonly string[] = ["dev", "staging"];
```

---

### Objects
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user"; // Optional + union type
  createdAt: Date;
}

const user: User = {
  id: crypto.randomUUID(),
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date(),
};
```

### 对象
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user"; // 可选属性 + 联合类型
  createdAt: Date;
}

const user: User = {
  id: crypto.randomUUID(),
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date(),
};
```

---

### Functions with types
```typescript
function greet(name: string): string { // Return type annotation
  return `Hello, ${name}!`;
}

// Arrow function version:
const double = (n: number): number => n * 2;

// Void for functions that don't return
function log(message: string): void {
  console.log(message);
}

// Never for functions that never complete
function fail(message: string): never {
  throw new Error(message);
}
```

### 函数类型
```typescript
function greet(name: string): string { // 返回类型注解
  return `Hello, ${name}!`;
}

// 箭头函数版本：
const double = (n: number): number => n * 2;

// Void 用于没有返回值的函数
function log(message: string): void {
  console.log(message);
}

// Never 用于永远不会执行完毕的函数
function fail(message: string): never {
  throw new Error(message);
}
```

---

### Interfaces vs Type Aliases
// Interface — best for object shapes (extensible)
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
}

// Extending interfaces
interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize: number;
}
```
// Type alias — more flexible (unions, tuples, computed types)
```typescript
type ID = string | number; // Union type
type Status = "pending" | "active" | "archived";
type Pair<T> = [T, T]; // Generic tuple

// Intersection types (combining multiple types)
type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date; };
type TimestampedProduct = WithTimestamps<Product>;
```
// When to use which:
// ✅ Interface: Object shapes, class implementation, needs extending
// ✅ Type alias: Unions, intersections, tuples, mapped types, complex computed types

### 接口 (Interface) 与类型别名 (Type Alias)
// Interface — 最适合定义对象结构（可扩展）
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
}

// 扩展接口
interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize: number;
}
```
// Type alias — 更灵活（联合类型、元组、计算类型）
```typescript
type ID = string | number; // 联合类型
type Status = "pending" | "active" | "archived";
type Pair<T> = [T, T]; // 泛型元组

// 交叉类型（组合多个类型）
type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date; };
type TimestampedProduct = WithTimestamps<Product>;
```
// 何时使用：
// ✅ Interface：对象结构、类实现、需要扩展时
// ✅ Type alias：联合类型、交叉类型、元组、映射类型、复杂的计算类型时

---

### Generics: Reusable Types
// Basic generic function
```typescript
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
```
// Generic interface
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: number;
}
```
// Constrained generics
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 泛型：可复用的类型
// 基础泛型函数
```typescript
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
```
// 泛型接口
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: number;
}
```
// 泛型约束
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

### Utility Types (Built-in Type Transformers)
*   **Partial<T>**: Make all properties optional.
*   **Required<T>**: Make all properties required.
*   **Omit<T, K>**: Remove specific properties.
*   **Pick<T, K>**: Keep only specific properties.
*   **Record<K, V>**: Dictionary/object map type.
*   **ReturnType<F>**: Get return type of function.
*   **Awaited<T>**: Unwrap Promise type.

### 工具类型（内置类型转换器）
*   **Partial<T>**: 将所有属性变为可选。
*   **Required<T>**: 将所有属性变为必选。
*   **Omit<T, K>**: 移除特定属性。
*   **Pick<T, K>**: 仅保留特定属性。
*   **Record<K, V>**: 字典/对象映射类型。
*   **ReturnType<F>**: 获取函数的返回类型。
*   **Awaited<T>**: 解包 Promise 类型。

---

### Practical Patterns
// Pattern 1: Discriminated unions (type-safe state machines)
```typescript
type RequestState<T> = 
  | { status: "idle" } 
  | { status: "loading" } 
  | { status: "success"; data: T } 
  | { status: "error"; error: Error };
```
// Pattern 2: Branded types (prevent mixing similar values)
```typescript
type UserId = string & { __brand: "UserId" };
type OrderId = string & { __brand: "OrderId" };
```
// Pattern 3: Const assertions (literal types)
```typescript
const CONFIG = {
  API_URL: "https://api.example.com",
  MAX_RETRIES: 3,
} as const;
```

### 实用模式
// 模式 1：可辨识联合（类型安全的状态机）
```typescript
type RequestState<T> = 
  | { status: "idle" } 
  | { status: "loading" } 
  | { status: "success"; data: T } 
  | { status: "error"; error: Error };
```
// 模式 2：品牌类型（防止混淆相似的值）
```typescript
type UserId = string & { __brand: "UserId" };
type OrderId = string & { __brand: "OrderId" };
```
// 模式 3：常量断言（字面量类型）
```typescript
const CONFIG = {
  API_URL: "https://api.example.com",
  MAX_RETRIES: 3,
} as const;
```