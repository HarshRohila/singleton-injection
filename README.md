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
const shape = container.resolve("shape");
// you will get TS suggestions for parameter of `resolve`, so no need to worry about spelling mistakes

// Destroy container instances
container.destroy();
// after destroy, container.resolve will create and return new instances
```

## Mocking in Tests

```ts
container.mock({
    shape: () => new MockedSquare() as Shape
});
// With above all `container.resolve("shape")` calls will return this mocked shape
// Note: mocked instances are not singletons, it will create instance everytime

// To restore mock, you can use same method with empty object, this will restore the original container
container.mock({});
```

## Developing this Project?

[See docs](docs/develop.md)
