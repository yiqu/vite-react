import { Components, Theme } from "@mui/material/styles";

export const MyComponents: Components<Omit<Theme, "components">> | undefined = {
  MuiButton: {
    defaultProps: {
      disableRipple: true
    }
  },
  MuiListItemButton: {
    defaultProps: {
      disableRipple: true
    }
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
      }
    },
    defaultProps: {
      primaryTypographyProps: {
        style: {
          whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis'
        }
      },
      secondaryTypographyProps: {
        style: {
          whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis'
        }
      }
    }
  },
  MuiInput: {
    defaultProps: {
      spellCheck: false
    }
  }
};