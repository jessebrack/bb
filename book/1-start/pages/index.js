import Head from 'next/head';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import withLayout from '../lib/withLayout';
import withAuth from '../lib/withAuth';
import notify from '../lib/notifier';

class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const { user } = this.props;
    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="List of purchased books" />
        </Head>
        <p>Content on Index page</p>
        <p>
          Email:
          {user.email}
        </p>
        <Button variant="contained" onClick={() => notify('success message')}>
          Click me to test notify()
        </Button>
      </div>
    );
  }
}

export default withAuth(withLayout(Index));
