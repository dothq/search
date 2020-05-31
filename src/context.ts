import { createGlobalState } from 'react-hooks-global-state';
 
const initialState = { sidebarVisible: false, news: undefined, bg: undefined };
export const { useGlobalState } = createGlobalState(initialState);