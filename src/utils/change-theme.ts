import { Message } from 'element-ui';
import app from '@/store/app';
import axios from 'axios';

const version = require('element-ui/package.json').version;
const ORIGINAL_THEME = '#409EFF';

export default class ThemeChange {
  private static instance: ThemeChange;
  private chalk = '';
  constructor() {
    if (typeof ThemeChange.instance === 'object') {
      return ThemeChange.instance;
    }
    ThemeChange.instance = this;
  }
  async changeTheme(theme: string, show: boolean = true) {
    const themeCluster = this.getThemeCluster(theme.replace('#', ''));
    const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''));

    let $message: any;

    if (show) {
      $message = Message.success({
        message: `    编辑主题中...`,
        // customClass: 'theme-message',
        type: 'success',
        duration: 0,
        center: true,
        iconClass: 'el-icon-loading',
      });
    }

    const getHandler = (variable: string, id: string) => {
      return () => {
        const oc = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''));
        const newStyle = this.updateStyle((this as any)[variable], oc, themeCluster);
        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.setAttribute('id', id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };

    if (!this.chalk) {
      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
      await this.getCSSString(url, 'chalk');
    }

    const chalkHandler = getHandler('chalk', 'chalk-style');

    chalkHandler();

    const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
      const text = (style as any).innerText;
      return new RegExp(ORIGINAL_THEME, 'i').test(text) && !/Chalk Variables/.test(text);
    });
    styles.forEach((style) => {
      const { innerText } = style;
      if (typeof innerText !== 'string') {
        return;
      }
      (style as any).innerText = this.updateStyle(innerText, originalCluster, themeCluster);
    });

    app.setTheme(theme);

    if (show && $message) {
      setTimeout(() => {
        $message.close();
      }, 200);
    }
  }

  updateStyle(style: any, oldCluster: any, newCluster: any) {
    let newStyle = style;
    oldCluster.forEach((color: string, index: number) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
    });
    return newStyle;
  }
  getThemeCluster(theme: string) {
    const tintColor = (color: string, tint: number) => {
      let red: number | string = parseInt(color.slice(0, 2), 16);
      let green: number | string = parseInt(color.slice(2, 4), 16);
      let blue: number | string = parseInt(color.slice(4, 6), 16);
      if (tint === 0) {
        return [red, green, blue].join(',');
      } else {
        red += Math.round(tint * (255 - red));
        green += Math.round(tint * (255 - green));
        blue += Math.round(tint * (255 - blue));
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        return `#${red}${green}${blue}`;
      }
    };
    const shadeColor = (color: string, shade: number) => {
      let red: number | string = parseInt(color.slice(0, 2), 16);
      let green: number | string = parseInt(color.slice(2, 4), 16);
      let blue: number | string = parseInt(color.slice(4, 6), 16);

      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);

      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);

      return `#${red}${green}${blue}`;
    };

    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  }
  async getCSSString(url: string, variable: string) {
    return await axios.get(url).then((res) => {
      if (res.status === 200) {
        (this as any)[variable] = res.data.replace(/@font-face{[^}]+}/, '');
      }
    });
  }

  changeSidarTheme(theme: string) {
    const changeThemeClass = document.getElementsByClassName('sidebar-logo');
    for (const key in changeThemeClass) {
      if (changeThemeClass.hasOwnProperty(key)) {
        const element: any = changeThemeClass[key];
        element.style.background = theme;
      }
    }
  }
}
