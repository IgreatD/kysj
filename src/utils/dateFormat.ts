/*
 * @Author: IgreatD
 * @Date: 2019-08-16 10:00:11
 * @Last Modified by: IgreatD
 * @Last Modified time: 2019-09-27 15:24:43
 *
 * 时间格式化工具
 */
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

/**
 *
 *
 * @param {*} [date=new Date()] 需要格式化的时间
 * @param {string} [format='YYYY-MM-DD'] 格式化样式
 * @returns 格式化后的时间字符串
 */
export function formatDate(date: any = new Date(), format: string = 'YYYY-MM-DD') {
  return moment(date).format(format);
}

/**
 * 时间之后的天数
 *
 * @param {number} [addNum=1] 之后多少天
 * @param {*} [date=new Date()] 需要格式化的时间
 * @param {string} [format='YYYY-MM-DD'] 格式化样式
 * @returns 格式化后的时间字符串
 */
export function formatAddTime(
  addNum: number = 1,
  date: any = new Date(),
  format: string = 'YYYY-MM-DD',
) {
  return moment(date)
    .add(addNum, 'days')
    .format(format);
}

/**
 * 时间之前的天数
 *
 * @param {number} [addNum=1] 之后多少天
 * @param {*} [date=new Date()] 需要格式化的时间
 * @param {string} [format='YYYY-MM-DD'] 格式化样式
 * @returns 格式化后的时间字符串
 */
export function formatSubtractTime(
  addNum: number = 1,
  date: any = new Date(),
  format: string = 'YYYY-MM-DD',
) {
  return moment(date)
    .subtract(addNum, 'days')
    .format(format);
}

export function getPreviousMonth() {
  const end = moment()
    .add(-1, 'month')
    .add(-1, 'days')
    .format('YYYY-MM');
  return end;
}

export function getNowMonth() {
  const start = moment().format('YYYY-MM') + '-01';
  return start;
}

export function getLastMonthDays(dateStr?: any) {
  const date = [];
  const start = moment(dateStr || Date.now()).format('YYYY-MM') + '-01';
  const end = moment(start)
    .add(1, 'month')
    .add(-1, 'days')
    .format('YYYY-MM-DD');
  date.push(start);
  date.push(end);
  return date;
}

export function getYearAndMonth(date: string | Date | number) {
  return {
    year: moment(date).year(),
    month: moment(date).month() + 1,
  };
}
