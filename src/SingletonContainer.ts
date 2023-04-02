interface ISingletonContainer<T extends Record<string, () => unknown>> {
    get<U extends keyof T>(key: U): ReturnType<T[U]>;
    destroy(): void;
}

export class SingletonContainer<T extends Record<string, () => unknown>>
    implements ISingletonContainer<T>
{
    private container!: Record<keyof T, unknown>;
    constructor(private singletonMap: T) {
        this.initContainer();
    }

    private initContainer() {
        this.container = {} as Record<keyof T, unknown>;
    }

    get<U extends keyof T>(key: U): ReturnType<T[U]> {
        if (!this.container[key]) {
            const getInstance = this.singletonMap[key];
            this.container[key] = getInstance();
        }

        return this.container[key] as ReturnType<T[U]>;
    }

    destroy() {
        this.initContainer();
    }
}
