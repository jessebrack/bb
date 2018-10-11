import Link from 'next/link';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { styleToolbar } from './SharedStyles';
import MenuDrop from './MenuDrop';

const optionsMenu = [
  {
    text: 'Got question?',
    href: 'https://github.com/builderbook/builderbook/issues',
  },
  {
    text: 'Log out',
    href: '/logout',
  },
];

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item sm={10} xs={9} style={{ textAlign: 'left' }}>
            {user ? (
              <Hidden smDown>
                <Link prefetch href="/">
                  <a style={{ marginRight: '20px' }}>Settings</a>
                </Link>
              </Hidden>
            ) : (
              <Link prefetch href="/">
                <Avatar
                  src="https://storage.googleapis.com/builderbook/logo.svg"
                  alt="Builder Book Logo"
                  style={{ margin: '0 auto 0 20px' }}
                />
              </Link>
            )}
          </Grid>
          <Grid item sm={1} xs={3} style={{ textAlign: 'right' }}>
            {user ? (
              <div style={{ whiteSpace: 'nowrap' }}>
                {user.avatarUrl ? (
                  <MenuDrop options={optionsMenu} src={user.avatarUrl} alt={user.displayName} />
                ) : null}
              </div>
            ) : (
              <Link prefetch href="/login">
                <a style={{ margin: '0 20px 0 auto' }}>Log in</a>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: null,
};

export default Header;
