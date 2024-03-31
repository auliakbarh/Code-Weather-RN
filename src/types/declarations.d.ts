declare type UnwrapArray<T> = T extends (infer U)[] ? U : T;
declare type ExtractArg<T> = T extends (arg?: infer Arg) => void ? Arg : never;

declare type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property]
}

declare type TAppColors =
    | "orange"
    | "black"
    | "gray"
    | "neutral"
    | "green"
    | "orangeBright"
    | "white"
    | "smoke"
    | "greenBright"
    | "error"

declare type TColorScheme = 'light' | 'dark' // 'device'

declare type TAppLang = 'id' | 'en'
