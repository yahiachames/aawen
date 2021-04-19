
import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export function adaptToWidth(x) {
    return width * x
}
export function adaptToheight(y) {
    return height * y
}