import settings from '@/config/settings';

import { formatApi } from '@/utils/apiFormat';

const trApis = {
  regeditReferer: 'Regedit',
};

formatApi(trApis, settings.apiProxies.tr);

export default trApis;
