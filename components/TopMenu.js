import React from 'react'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Link from 'next/link'
import { useRouter } from 'next/router'
const TopMenu = () => {
  const { asPath } = useRouter()

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className="classes.appBar"
    >
      <Toolbar className="classes.toolbar">
        <Typography
          sx={{ mr: '10px' }}
          variant="h6"
          color="inherit"
          noWrap
          className="classes.toolbarTitle"
        >
          Alex85 programmer
        </Typography>
        <nav className="classes.link">
          <Typography variant="span" sx={{ mr: '10px' }}>
            <Link href="/">
              <a className="active">Blog</a>
            </Link>
          </Typography>
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default TopMenu
