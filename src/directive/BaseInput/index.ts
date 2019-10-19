const vueInput: any = {};
vueInput.install = (Vue: any) => {
  Vue.directive('input', {
    inserted(el: any, vDir: any, vNode: any) {
      // vDir.value 有指令的参数
      let content: any;
      const setVal = (val: any) => {
        if (vNode.componentInstance) {
          vNode.componentInstance.$emit('input', val);
        } else {
          el.value = val;
          el.dispatchEvent(new Event('input'));
        }
      };
      // 按键按下=>只允许输入 数字/小数点
      el.addEventListener('keypress', (event: any) => {
        const e = event || window.event;
        const inputKey = String.fromCharCode(
          typeof e.charCode === 'number' ? e.charCode : e.keyCode,
        );
        const re = /\d|\./;
        content = e.target.value;
        // 定义方法,阻止输入
        function preventInput() {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
        if (!re.test(inputKey) && !e.ctrlKey) {
          preventInput();
        } else if (content.indexOf('.') > 0 && inputKey === '.') {
          // 已有小数点,再次输入小数点
          preventInput();
        }
      });
      // 按键弹起=>并限制最大最小
      el.addEventListener('keyup', (event: any) => {
        if (vDir.value && vDir.value.precision) {
          const e = event || window.event;
          content = parseFloat(e.target.value);
          if (!content) {
            content = 0.0;
          }
          const split = content.toString().split('.');
          let argPrecision = 0;
          argPrecision = parseFloat(vDir.value.precision);
          if (split[1] && split[1].length > argPrecision) {
            e.target.value = content.toFixed(argPrecision);
          }
        }
      });
      el.addEventListener('focusout', (event: any) => {
        const e = event || window.event;
        content = parseFloat(e.target.value);
        if (!content) {
          content = 0.0;
        }
        if (vDir.value) {
          if (vDir.value.max) {
            let argMax = 0;
            argMax = parseFloat(vDir.value.max);
            if (argMax !== undefined && content > argMax) {
              setVal(argMax);
              content = argMax;
            }
          }
          if (vDir.value.min) {
            let argMin = 0;
            argMin = parseFloat(vDir.value.min);

            if (argMin !== undefined && content < argMin) {
              setVal(argMin);
              content = argMin;
            }
          }
        }
      });
    },
  });
};

export default vueInput;
