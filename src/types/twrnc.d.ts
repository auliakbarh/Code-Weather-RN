declare module 'twrnc' {
    import { TwConfig } from 'twrnc/dist/esm/tw-config';
    export interface TailwindFn {
        color: (color: TAppColors) => string | undefined;
        create: (twConfig?: TwConfig) => TailwindFn;
    }
}

export module 'twrnc'
