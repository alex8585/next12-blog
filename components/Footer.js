import React from "react"
import Box from "@mui/material/Box"
import Copyright from "../components/Copyright"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"


const Footer = () => {
  return (
    <Container maxWidth="md" component="footer" className="classes.footer">
      <Grid container spacing={4} justify="space-evenly">
        {/* {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="textSecondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))} */}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Footer
