
import { heightRatio } from '../../utility/utility';

export const fonts = {
    black:'Roboto-Black',
    bold:'Roboto-Bold',
    medium:'Roboto-Medium',
    regular:'Roboto-Regular'
}
export const fontSize = {
    xSmall:13,
    small:15,
    medium:17,
    large:19,
    xLarge:21,
    xxLarge:23,
    lager:26,
    xLarger:29,
    huge:32,
}
export class UIFont {
    static font = (type = fonts.regular,size=fontSize.medium,color='#fff') => {
        return {
            fontFamily: type === null ? fonts.regular : type,
            fontSize: size === null ? fontSize.medium : size,
            color: color === null ? '#fff' : color
        }
    }
}
