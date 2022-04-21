import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect, FC, useMemo, useState, ChangeEvent } from 'react'
import postService from '../services/posts'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { getPosts, selectPostsList } from '../features/posts/postsSlice'

import { wrapper } from '../features/store'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import Image from 'next/image'
import Head from 'next/head'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { calcPages } from '../utils/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import AgricultureIcon from '@mui/icons-material/Agriculture'
import FrontendLayout from '../components/FrontendLayout'

import axiosClient from '../services/axiosClient'

import axios from '../services/axios'

import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'
const perPage = 6
const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const posts = useAppSelector(selectPostsList)
  const postsLoading = useAppSelector((state) => state.posts.loading)
  const page = useAppSelector((state) => state.posts.page)
  const total = useAppSelector((state) => state.posts.total)

  const countPages = calcPages(perPage, total)
  const images: Array<string> = []

  const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN

  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [tagFilter, setTagFilter] = useState([])

  const setCurrentImage = (index: number) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  const { user } = useAuth({ loginUrl: 'login' })
  if (user) {
    console.log(user)
  }

  useEffect(() => {
    ;(async () => {
      //      axiosClient.defaults.baseURL = 'http://local-next-lara.com'
    })()
  }, [])

  const handleOpenPost = (id: number) => {
    router.push(`/post/${id}`)
  }
  return (
    <FrontendLayout>
      <Head>
        <title>Blog</title>
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
          Blog
        </Typography>

        {!postsLoading && (
          <div>
            {posts.map((post: any) => {
              return (
                <div key={post.id}>
                  <Card sx={{ mb: '10px', maxWidth: 1200 }}>
                    <Image
                      className="classes.image"
                      src={
                        post.media[0]
                          ? API_DOMAIN + post.media[0].original_url
                          : ''
                      }
                      alt={'post.images[0].id'}
                      width={1000}
                      height={600}
                    />

                    {/* <CardMedia */}
                    {/*   component="img" */}
                    {/*   height="600" */}
                    {/*   image={ */}
                    {/*     post.media[0] */}
                    {/*       ? API_DOMAIN + post.media[0].original_url */}
                    {/*       : '' */}
                    {/*   } */}
                    {/*   alt="green iguana" */}
                    {/* /> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.description,
                        }}
                      ></div>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={(e) => handleOpenPost(post.id)}
                        size="small"
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </FrontendLayout>
  )
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(getPosts({ page: 1, perPage }))
    return {
      props: {},
      revalidate: false,
    }
  }
)

export default Home
