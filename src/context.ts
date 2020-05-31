import { createGlobalState } from 'react-hooks-global-state';
 
const initialState = { sidebarVisible: false, logoClicks: -1, news: undefined };
export const { useGlobalState } = createGlobalState(initialState);