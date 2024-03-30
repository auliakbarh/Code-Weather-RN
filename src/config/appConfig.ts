interface IAppConfig {
    apiKey: string
}
export const appConfig: IAppConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY as string,
}
