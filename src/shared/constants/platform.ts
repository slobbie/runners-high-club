import {Platform} from 'react-native';

const ANDROID = Platform.OS === 'android';
const IOS = Platform.OS === 'ios';

export {ANDROID, IOS};
