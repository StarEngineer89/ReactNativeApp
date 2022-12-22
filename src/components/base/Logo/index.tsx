import React from 'react';
import { SvgProps } from 'react-native-svg';
import MainLogo from './__SVG__/MainLogo';
import MenuLogo from './__SVG__/MenuLogo';
import styles from './styles';
import NewLogo from './__SVG__/NewLogo';
import { palette } from 'src/config';

interface LogoProps extends SvgProps {
  type: 'main' | 'menu';
  size: 'lg' | 'sm';
}

const Logo = ({ type = 'main', size = 'sm', ...props }: LogoProps) => {
  if (type === 'main') {
    let width = styles.size[size].width;
    let height = styles.size[size].height;

    return <NewLogo width={width} height={height} {...props} fillColor='#0b1127' />;
  } else {
    let width = styles.size.menu.width;
    let height = styles.size.menu.height;

    return (
      <NewLogo width={width} height={height} fillColor={palette.link_water} iconColor={palette.link_water} {...props} />
    );
  }
};

export default Logo;
