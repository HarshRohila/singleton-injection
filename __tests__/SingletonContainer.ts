import { SingletonContainer } from "../src/SingletonContainer";

const singletonMap = {
    shape: () => new Circle() as Shape,
    otherShape: () => new Square() as Shape
};

describe("SingletonContainer", () => {
    describe("get method", () => {
        it("returns correct instance", () => {
            const container = new SingletonContainer(singletonMap);

            const shape = container.get("shape");

            expect(shape.getName()).toBe("circle");
        });

        it("returns same instance if called again", () => {
            const container = new SingletonContainer(singletonMap);

            const shape = container.get("shape");
            const sameShape = container.get("shape");

            expect(shape === sameShape).toBeTruthy();
        });
    });

    describe("destroy method", () => {
        it("destroys container such that if get method called after it, it will return new instance", () => {
            const container = new SingletonContainer(singletonMap);

            const shape = container.get("shape");

            container.destroy();

            const otherShape = container.get("shape");

            expect(shape === otherShape).toBeFalsy();
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
