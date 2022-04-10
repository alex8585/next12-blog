import React from "react"
//import Link from "@material-ui/core/Link"
import Typography from "@mui/material/Typography";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <span>Alex85 Portfolio</span> {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default Copyright
