import { inRouter } from '@/utils/updateRouter';
import TypeWriteInit from '@/scripts/TypeWrite';
import codeInit from '@/scripts/Code';
import BackTopInitFn from '@/scripts/BackTop';
import { searchFn, vhSearchInit } from '@/scripts/Search';
import vhLzImgInit from '@/scripts/vhLazyImg';
import ViewImage from '@/scripts/ViewImage';
import initMobileSidebar from '@/scripts/MobileSidebar';
const init = () => {
  vhLzImgInit(); codeInit(); vhSearchInit(); initMobileSidebar();
  void searchFn('');
};
export default () => { init(); TypeWriteInit(); BackTopInitFn(); void ViewImage(); inRouter(init); };
