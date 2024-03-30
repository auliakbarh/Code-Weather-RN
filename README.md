# OpenWeather App

Weather forecasts, nowcasts and history in a fast and elegant way using [OpenWeather API](https://openweathermap.org/).

[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org) [![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/) [![Linkedin](https://img.shields.io/badge/-Aulia%20Akbar%20Harahap-blue?style=flat-square&labelColor=gray&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/aulia-akbar-harahap)](https://www.linkedin.com/in/aulia-akbar-harahap)

## Content

- [Features](#Features)
- [Stacks](#Stacks)
- [Run the Project](#Run-the-Project)
- [Regenerate Native Folder](#Regenerate-Native-Folder)
- [Test](#Test)

## Features

- Get current weather (by location and by city)
- Get a 3 - hour forecast for 5 days (by location and by city)

## Stacks

- Project generated using [bun](https://bun.sh/) + [Expo](https://expo.dev/)
- [Setup TypeScript for Expo](https://docs.expo.dev/guides/typescript/)
- [Redux Tool Kit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)
- `eslint` + `Standard` configured (using `npm`)

## Run the Project

To run with Expo Go:

```shell
bunx expo start --ios
bunx expo start --android
```

To run with React Native:
```shell
bun run ios
bun run android
```

## Regenerate Native Folder

```shell
bunx expo prebuild --clean
```

## Test

To run test and coverage, use `jest`

```shell
jest
```

