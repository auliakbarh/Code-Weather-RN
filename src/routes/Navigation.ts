import React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';
import {
    CommonActions,
    NavigationAction,
    StackActions,
} from '@react-navigation/routers';

export interface IRoutes {
    index: number;
    key?: string;
    name: string;
    path?: string;
    params?: Record<string, any>;
    state?: any;
}
export class Navigation {
    navigationRef: React.RefObject<
        NavigationContainerRef<any> & { state?: { nav?: any } }
    > = React.createRef();

    dispatch(action: NavigationAction) {
        this.navigationRef.current?.dispatch(action);
    }
    navigateAndReset(
        routes: Array<WithRequiredProperty<Partial<IRoutes>, 'name'>>,
        index: number,
    ) {
        this.navigationRef.current?.dispatch(
            CommonActions.reset({
                index: index ?? 0,
                routes: routes ?? [],
            }),
        );
    }

    navigateAndSimpleReset(
        name: string,
        routesParams?: Partial<Omit<IRoutes, 'name'>>,
    ) {
        const { index = 0, params, key, path, state } = routesParams ?? {};
        this.navigationRef.current?.dispatch(
            CommonActions.reset({
                index,
                routes: [{ name, params, key, path, state }],
            }),
        );
    }

    navigateAndReplace(name: string, params?: Record<string, any>) {
        this.navigationRef.current?.dispatch(StackActions.replace(name, params));
    }

    navigate(routeName: string, params?: Record<string, any>) {
        this.navigationRef.current?.navigate(routeName, params);
    }
    push(routeName: string, params?: Record<string, any>) {
        this.navigationRef.current?.dispatch(StackActions.push(routeName, params));
    }

    replace(routeName: string, params?: Record<string, any>) {
        this.navigationRef.current?.dispatch(
            StackActions.replace(routeName, params),
        );
    }

    goBack() {
        this.navigationRef.current?.dispatch(CommonActions.goBack());
    }

    getNav() {
        return this.navigationRef.current;
    }

    getCurrentRoute() {
        if (this.navigationRef.current) {
            let navIterator = this.navigationRef.current?.state?.nav;
            while (navIterator.index != null) {
                navIterator = navIterator.routes[navIterator.index];
            }
            return navIterator.routeName;
        }
        return undefined;
    }

    getCurrentRouteName() {
        return this.getCurrentRoute() && this.getCurrentRoute().routeName;
    }
}

export const navigation = new Navigation();
