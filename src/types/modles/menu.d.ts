export interface MenuDataModel {
  name: string;
  url: string;
  otherName: string;
  icon?: string;
  childList: MenuDataModel[];
  functionList?: [];
}

export interface FunctionsModel {
  icon: string;
  name: string;
  otherName: string;
  id: number;
  groupId: number;
  campusId: number;
}
