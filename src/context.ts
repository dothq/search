import { createGlobalState } from 'react-hooks-global-state';
 
const initialState = { sidebarVisible: false, logoClicks: -1 };
export const { useGlobalState } = createGlobalState(initialState);