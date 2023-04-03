# Singleton Injection

A simple way to manage singletons

This provides a way to create Singleton Container to store Singleton instances

## Usage

```ts
// container.ts
import { SingletonContainer } from "singleton-injection";

// Define your singletons
const singletonMap = {
    shape: () => new Circle() as Shape,
    otherShape: () => new Square() as Shape
};

// Create Singleton container
export const container = new SingletonContainer(singletonMap);

// app.ts
// Get instance in your app with
import { container } from "./container";

// now you can get same instance of shape anywhere in your code
const shape = container.get("shape");
// you will get TS suggestions for parameter of `get`, so no need to worry about spelling mistakes

// Destroy container instances
container.destroy();
// after destroy, container.get will create and return new instances
```
