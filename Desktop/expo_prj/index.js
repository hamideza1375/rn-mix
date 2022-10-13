import ReactDOM from 'react-dom/client';
import { registerRootComponent } from 'expo';
import Serif_Regular from './assets/fonts/PTSerif-Regular.ttf';
import serif_Bold from './assets/fonts/PTSerif-Bold.ttf';
import App from './App';

const iconFontStyles =
 `@font-face { src: url(${serif_Bold}); font-family: serif_Bold; font-weight:bolder; }
  @font-face { src: url(${Serif_Regular}); font-family: Serif_Regular;}`
const style = document.createElement('style');
if (style.styleSheet) {style.styleSheet.cssText = iconFontStyles;
} else {style.appendChild(document.createTextNode(iconFontStyles));}
document.head.appendChild(style);

 const head = document.getElementsByTagName("head")[0]

 const meta = document.createElement('meta');
 meta.name = "description"
 meta.content = "delivery fastfood فست فود کاکتوس سبزوار پیتزا ساندویچ غذا بیرون بر سفارش آنلاین"
 head.appendChild(meta)
 
 const meta2 = document.createElement('meta');
 meta2.name = "keywords"
 meta2.content = "delivery fastfood فست فود فسفود کاکتوس پیتزا ساندویچ بیرون بر اغذیه سبزوار غذا سفارش آنلاین"
 head.appendChild(meta2)
 
 const meta3 = document.createElement('meta');
 meta3.name = "subject"
 meta3.content = "فست فود پیتزا ساندویچ"
 head.appendChild(meta3)

 const meta4 = document.createElement('meta');
 meta4.name = "language"
 meta4.content = "fa"
 head.appendChild(meta4)
 
//  const meta5 = document.createElement('meta');
//  meta5.name = "robots"
//  meta5.content = "index, follow"
//  head.appendChild(meta5)

 const meta6 = document.createElement('meta');
 meta6.name = "topic"
 meta6.content = "اغذیه"
 head.appendChild(meta6)

registerRootComponent(App);
