import { Box } from '@material-ui/core/';

import logo from '../../Images/logo.png';

const CalendAppLogo = (): JSX.Element => {
  return (
    <Box my={5}>
      <img src={logo} alt="CalendApp Logo" />
    </Box>
  );
};

export default CalendAppLogo;
