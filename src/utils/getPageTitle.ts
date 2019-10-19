import settings from '@/config/settings';

function getPageTitle(title?: string) {
  return title === undefined ? settings.title : `${title} - ${settings.title}`;
}

export default getPageTitle;
