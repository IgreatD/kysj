function getHtmlTempalte(content: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>软件帮助</title></head><body>${content}</body></html>`;
}

export default function convertHtml(content: string) {
  return getHtmlTempalte(content);
}

const REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;

export function getBody(content: string) {
  const result = REG_BODY.exec(content);
  if (result && result.length === 2) {
    return result[1];
  }
  return content;
}
