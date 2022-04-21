import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Head from 'next/head'
import FrontendLayout from '../components/FrontendLayout'
import { useEffect, FC, useMemo, useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { useAuth } from '../hooks/auth'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const Login: FC = () => {
  const { isLoged, login } = useAuth({ loginUrl: 'login' })
  const [userLogin, setUserLogin] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()


  useEffect(() => {
    if (isLoged) {
      router.push('/')
    }
  }, [isLoged, router, error])

  async function submitHandler() {
    let res = await login(userLogin, userPassword)
    if (res.error) {
      setError(res.msg)
    } else {
      setError('')
    }
  }
  return (
    <FrontendLayout>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Welcome to alex85 portfolio page" />
      </Head>

      <Container maxWidth="lg" component="main" className="classes.heroContent">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Login page
        </Typography>
        <Box
          sx={{
            margin: '40px auto',
            width: '350px',
            '& button': { m: 1, width: '50px' },
          }}
        >
          <Stack component="form" sx={{}} noValidate autoComplete="off">
            <div>{error}</div>
            <TextField
              onChange={(e) => setUserLogin(e.target.value)}
              value={userLogin}
              sx={{
                width: '100%',
                margin: '10px ',
              }}
              required
              id="login"
              label="Login"
            />
            <TextField
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              sx={{
                width: '100%',
                margin: '10px ',
              }}
              required
              id="password"
              type="password"
              label="Password"
            />

            <Button
              onClick={submitHandler}
              sx={{}}
              size="medium"
              variant="outlined"
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Container>
    </FrontendLayout>
  )
}

export default Login
