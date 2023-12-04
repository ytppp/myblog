import type { ErrorMessageMode } from '@/constants/http';
import { useMessage } from '@/hooks/useMessage';
import { useLocale } from '@/locale/useLocale';
// import router from '@/router';
// import { PageEnum } from '@/router/constant';
import { useUserStoreWithOut } from '@/store/modules/user';
import projectSetting from '@/settings/project';
import { SessionTimeoutProcessingEnum } from '@/constants/config';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const stp = projectSetting.sessionTimeoutProcessing;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  const { translate } = useLocale();
  const userStore = useUserStoreWithOut();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      userStore.setToken(undefined);
      errMessage = msg || translate('trans0010');
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true);
      } else {
        userStore.logout(true);
      }
      break;
    case 403:
      errMessage = translate('trans0011');
      break;
    // 404请求不存在
    case 404:
      errMessage = translate('trans0012');
      break;
    case 405:
      errMessage = translate('trans0013');
      break;
    case 408:
      errMessage = translate('trans0014');
      break;
    case 500:
      errMessage = translate('trans0015');
      break;
    case 501:
      errMessage = translate('trans0016');
      break;
    case 502:
      errMessage = translate('trans0017');
      break;
    case 503:
      errMessage = translate('trans0018');
      break;
    case 504:
      errMessage = translate('trans0019');
      break;
    case 505:
      errMessage = translate('trans0020');
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: translate('trans0005'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
