import {
    NavigationActions,
    StackActions,
    DrawerActions
} from "react-navigation";

let navigatorRef;

const setNavigatorRef = ref => (navigatorRef = ref);
const getNavigatorRef = () => navigatorRef;

const push = (routeName, params = {}) =>
    navigatorRef.dispatch(NavigationActions.navigate({ routeName, params }));

const pop = (popCount = 1, params = {}) =>
    navigatorRef.dispatch(
        StackActions.pop(({ n: popCount, params } = { n: 1, params: {} }))
    );

const popToTop = () => navigatorRef.dispatch(StackActions.popToTop());

const openDrawer = () => navigatorRef.dispatch(DrawerActions.openDrawer());
const closeDrawer = () => navigatorRef.dispatch(DrawerActions.closeDrawer());

export {
    setNavigatorRef,
    getNavigatorRef,
    push,
    pop,
    openDrawer,
    closeDrawer,
    popToTop
};
