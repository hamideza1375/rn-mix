import { registerRootComponent } from 'expo';
import App from './App';
import serif_Bold from './assets/fonts/PTSerif-Bold.ttf';
import Serif_Regular from './assets/fonts/PTSerif-Regular.ttf';

const iconFontStyles =
    `@font-face { 
    src: url(${serif_Bold}); font-family: serif_Bold;
    font-weight:bolder;
 }
  @font-face { 
    src: url(${Serif_Regular}); font-family: Serif_Regular;
 }`

const style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
} else {
    style.appendChild(document.createTextNode(iconFontStyles));
}

document.head.appendChild(style);


registerRootComponent(App);
