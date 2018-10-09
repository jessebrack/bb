import Head from 'next/head';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import withLayout from '../lib/withLayout';

const Index = ({ user }) => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index page</title>
      <meta name="description" content="This is the description of the Index page" />
    </Head>
    <p>Content on Index page</p>
    <p>
      Email:
      {user.email}
    </p>
    <Button variant="raised">MUI Button</Button>
  </div>
);

Index.getInitialProps = async ({ query }) => ({ user: query.user });

Index.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

export default withLayout(Index);
