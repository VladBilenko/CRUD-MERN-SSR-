import authWatchers from './auth.watchers';
import notationWatchers from "./notation.watchers";

const watchers = [
    ...authWatchers,
    ...notationWatchers
];

export default watchers;