interface ConstructorOptions {
  startMode: string
  doneCallback: (solution: string) => void
  errorCallback: (err: Error) => void
}

declare module 'friendly-challenge' {
  export declare class WidgetInstance {
    static reset: () => void
    constructor(container: HTMLDivElement, options: ConstructorOptions) {
      super()
    }
  }
}
