interface ISingletonContainer<T extends Record<string, () => unknown>> {
    resolve<U extends keyof T>(key: U): ReturnType<T[U]>;
    destroy(): void;
}

export class SingletonContainer<T extends Record<string, () => unknown>>
    implements ISingletonContainer<T>
{
    private container!: Record<keyof T, unknown>;
    private originalMap: T;

    constructor(private singletonMap: T) {
        this.originalMap = { ...this.singletonMap };
        this.initContainer();
    }

    private initContainer() {
        this.container = {} as Record<keyof T, unknown>;
    }

    resolve<U extends keyof T>(key: U): ReturnType<T[U]> {
        if (!this.container[key]) {
            const getInstance = this.singletonMap[key];

            const isCacheSkip = this.skippedCacheKeys.has(key as string);

            if (isCacheSkip) {
                return getInstance() as ReturnType<T[U]>;
            }

            this.container[key] = getInstance();
        }

        return this.container[key] as ReturnType<T[U]>;
    }

    destroy() {
        this.initContainer();
    }

    private skippedCacheKeys = new Set<string>();
    mock(mockMap: Partial<T>) {
        this.skippedCacheKeys = new Set<string>();

        Object.keys(mockMap).forEach(key => {
            this.skippedCacheKeys.add(key);

            if (!this.singletonMap[key as keyof T]) {
                throw new Error(
                    `Cannot mock "${key}" as its not registered during initialization of SingletonContainer`
                );
            }
            delete this.container[key as keyof T];
        });
        this.singletonMap = { ...this.originalMap, ...mockMap };
    }
}
