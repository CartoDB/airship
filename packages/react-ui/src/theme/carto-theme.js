import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const cartoOptions = {
  themeName: 'CARTO',
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    unit: 'px',
    tep: 5,
    // For more information about use this helper functions: https://material-ui.com/customization/spacing/#custom-spacing
    // up: f d(),
    // down: f down(),
    // between: f p(),
    // only: f only(),
    // width: f width(),
  },
  direction: 'ltr',
  mixins: {
    // gutters: f gutters(),
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48,
      },
      '@media (min-width:600px)': {
        minHeight: 56,
      },
    },
  },
  palette: {
    type: 'light',
    common: {
      black: '#2c3032',
      white: '#fff',
    },
    primary: {
      light: '#68a9ee',
      main: '#036fe2',
      dark: '#012c5a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#91e9c2',
      main: '#47db99',
      dark: '#2b835c',
      contrastText: '#fff',
    },
    error: {
      light: '#f3d6ce',
      main: '#c1300b',
      dark: '#741d07',
      contrastText: '#fff',
    },
    warning: {
      light: '#fbebcc',
      main: '#f29e02',
      dark: '#5f3e01',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      light: '#cde2f9',
      main: '#024388',
      dark: '#012c5a',
      contrastText: '#fff',
    },
    success: {
      light: '#e2ecd2',
      main: '#709f1d',
      dark: '#435f11',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    // getContrastText: f E(),
    // augmentColor: f B(),
    tonalOffset: 0.2,
    text: {
      primary: '#2c3032',
      secondary: 'rgba(44, 48, 50, 0.6)',
      disabled: 'rgba(44, 48, 50, 0.4)',
      hint: 'rgba(44, 48, 50, 0.2)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      default: 'rgba(44, 48, 50, 0.05)',
      paper: '#ffffff'
    },
    // props: Object => Research,
    /* Custom Colors palette */
    customGrey: {
      50: '#f8f9f9',
      100: '#e1e3e4',
      200: '#cbcdcf',
      300: '#b4b8ba',
      400: '#9da2a6',
      500: '#868d91',
      600: '#6f777c',
      700: '#595f63',
      800: '#43474a',
      900: '#2c3032',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  ],
  typography: {
    htmlFontSize: 16,
    // pxToRem: f (),
    // round: f S(),
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '6rem',
      lineHeight: 1.8,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '4rem',
      lineHeight: 1.13,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.17,
      letterSpacing: '0em',
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '2.125rem',
      lineHeight: 1.18,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.71,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.14,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.71,
      letterSpacing: '0.02857em',
      textTransform: 'inherit',
    },
    caption: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.33,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: '0.625rem',
      lineHeight: 1.6,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  spacing: 8, // For custom spacing: https://material-ui.com/customization/spacing/#custom-spacing
  shape: {
    borderRadius: 4,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    // create: f create(), => Research
    // getAutoHeightDuration: f getAutoHeightDuration(), => Research
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          position: 'fixed',
          width: '6px',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'none',
          background: 'rgba(0, 0, 0, 0.05)',
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '3px',
          background: 'rgba(0, 0, 0, 0.3)',
          outline: 'none',
        },
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none'
      },
      outlined: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px'
        }
      },
      outlinedPrimary: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px'
        }
      },
      outlinedSecondary: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px'
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: '6px',
        borderRadius: '3px',
      }
    },
    MuiBreadcrumbs: {
      separator: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiButton: {
      disableElevation: true
    },
  }
};

export function createTheme(options = {}) {
  const themeOptions = {
    ...cartoOptions,
    ...options,
  };

  let theme = createMuiTheme(themeOptions);

  theme = responsiveFontSizes(theme, {
    breakpoints: themeOptions.breakpoints.keys,
    disableAlign: false,
    factor: 2,
    variants: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'button',
      'caption',
      'overline',
    ],
  });

  return theme;
}