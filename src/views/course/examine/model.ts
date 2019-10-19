import { IRowHeader } from '@/components/BaseTable';
import { isEmpty } from '@/utils';

export const rowHeader: IRowHeader[] = [
  {
    label: '创建时间',
    prop: 'CreateDate',
    width: 150,
  },
  {
    label: '视频名称',
    prop: 'Name',
  },
  {
    label: '视频描述',
    prop: 'Describe',
  },
  {
    label: '讲师',
    prop: 'TeacherName',
  },
  {
    label: '视频播放',
    width: 80,
    h: (h: any, { row }: any) => {
      return !isEmpty(row.VideoPath)
        ? h('el-button', {
            attrs: {
              circle: true,
              icon: 'el-icon-view',
            },
            on: {
              click: () => {
                window.open(row.VideoPath);
              },
            },
          })
        : h('i', { class: 'el-icon-error' });
    },
  },
  {
    label: '操作',
    width: 220,
    h: (h: any, { vm, row }: any) => {
      return h(
        'el-button',
        {
          attrs: {
            type: 'warning',
            icon: 'el-icon-edit',
          },
          on: {
            click: () => {
              vm.$emit('examine', row);
            },
          },
        },
        '审核',
      );
    },
  },
];
