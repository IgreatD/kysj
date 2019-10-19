export const validatePhone = (rule: any, value: any, callback: any) => {
  const myreg = /^[1][1-9]{1}[0-9]{9}$/;
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else {
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的手机号'));
    }
    callback();
  }
};
