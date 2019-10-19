export function formatApi(apis: any, prefix: string) {
  for (const key in apis) {
    if (apis.hasOwnProperty(key)) {
      const value = (apis as any)[key];
      (apis as any)[key] = `${prefix}${value}`;
    }
  }
}
