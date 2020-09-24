import { Button, Menu, Label, Page } from '../grp-types';

import labels from './labels';
import menus from './navmenus';
import buttons from './buttons';
import pages from './pages';

export default {
  [Button]: buttons,
  [Label]: labels,
  [Menu]: menus,
  [Page]: pages,
};
