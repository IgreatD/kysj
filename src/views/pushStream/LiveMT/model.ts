import { IRowHeader } from '@/components/BaseTable';
import { IForm } from '@/types/form';
import { IFormType } from '@/types/formType';
import LiveExpand from './live-expand.vue';
import kysjApis from '@/api/kysj';

export const forms: IForm[] = [
  {
    type: IFormType.INPUT,
    form: {
      label: '推流域名',
      value: '',
      key: 'DomainName',
    },
  },
  {
    type: IFormType.INPUT,
    form: {
      label: '推流路径',
      key: 'AppName',
      value: '',
    },
  },
];

export const rowHeader: IRowHeader[] = [
  {
    type: 'expand',
    width: 65,
    h: (h: any, { row }: any) => {
      return h(LiveExpand, { attrs: { live: row } });
    },
  },
  {
    label: '流名称',
    prop: 'StreamName',
  },
  {
    label: '推流路径',
    prop: 'AppName',
  },
  {
    label: '推流域名',
    prop: 'PushDomain',
  },
  {
    label: '推流开始时间',
    prop: 'BeginPushTime',
    width: 150,
  },
  {
    label: '操作',
    width: 320,
    h: (h: any, { vm, row }: any) => {
      return h('div', [
        h(
          'el-button',
          {
            attrs: {
              type: 'warning',
            },
            on: {
              click: () => {
                vm.$emit('opear-steam', { row, url: kysjApis.forbidLiveStream, name: '禁播' });
              },
            },
          },
          '禁播',
        ),
        h(
          'el-button',
          {
            attrs: {
              type: 'primary',
            },
            on: {
              click: () => {
                vm.$emit('opear-steam', { row, url: kysjApis.resumeLiveStream, name: '恢复' });
              },
            },
          },
          '恢复',
        ),
        h(
          'el-button',
          {
            attrs: {
              type: 'danger',
            },
            on: {
              click: () => {
                vm.$emit('opear-steam', { row, url: kysjApis.dropLiveStream, name: '断开' });
              },
            },
          },
          '断开',
        ),
        h(
          'el-button',
          {
            attrs: {
              type: 'success',
            },
            on: {
              click: () => {
                vm.$emit('play', row);
              },
            },
          },
          '播放',
        ),
      ]);
    },
  },
];
