import { SingletonContainer } from "../src";

const singletonMap = {
    shape: () => new Circle() as Shape,
    otherShape: () => new Square() as Shape
};

describe("SingletonContainer", () => {
    describe("resolve method", () => {
        it("returns correct instance", () => {
            const DI = new SingletonContainer(singletonMap);

            const shape = DI.resolve("shape");

            expect(shape.getName()).toBe("circle");
        });

        it("returns same instance if called again", () => {
            const DI = new SingletonContainer(singletonMap);

            const shape = DI.resolve("shape");
            const sameShape = DI.resolve("shape");

            expect(shape === sameShape).toBeTruthy();
        });
    });

    describe("destroy method", () => {
        it("destroys container such that if get method called after it, it will return new instance", () => {
            const DI = new SingletonContainer(singletonMap);

            const shape = DI.resolve("shape");

            DI.destroy();

            const otherShape = DI.resolve("shape");

            expect(shape === otherShape).toBeFalsy();
        });
    });

    describe("mock method", () => {
        it("replaces original singleton map with the new one", () => {
            const DI = new SingletonContainer(singletonMap);
            expect(DI.resolve("shape").getName()).toBe("circle");

            DI.mock({
                shape: () => new Square() as Shape
            });

            expect(DI.resolve("shape").getName()).toBe("square");

            // Resetting the mock
            DI.mock({});
            expect(DI.resolve("shape").getName()).toBe("circle");
        });
    });
});

class Square implements Shape {
    getName(): string {
        return "square";
    }
}
interface Shape {
    getName(): string;
}

class Circle implements Shape {
    getName(): string {
        return "circle";
    }
}
