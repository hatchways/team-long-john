import { Grid } from '@material-ui/core';
import Navigation from '../Navigation/Navigation';

const Success = (): JSX.Element => {
  return (
    <div>
      <Navigation />
      <Grid container direction="column" alignItems="center">
        <h1>Thanks for your order!</h1>
        <p>We appreciate your business! If you have any questions, please use our support page</p>
      </Grid>
    </div>
  );
};

export default Success;
