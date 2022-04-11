import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { useEffect, FC, useMemo, useState, ChangeEvent } from 'react'
import postService from '../../services/posts'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { getPost, selectPost } from '../../features/posts/postsSlice'

import { wrapper } from '../../features/store'
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
import { calcPages } from '../../utils/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import AgricultureIcon from '@mui/icons-material/Agriculture'
import FrontendLayout from 'components/FrontendLayout'

import postsService from '../../services/posts'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
const Post: FC<InferGetStaticPropsType<any>> = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const post = useAppSelector(selectPost)
  const postLoading = useAppSelector((state) => state.posts.loading)

  const id = router.query.id ? parseInt(router.query.id as string) : null

  useEffect(() => {
    if (id) {
      {
        /* dispatch(getPost({ id })) */
      }
    }
  }, [dispatch, id])

  return (
    <FrontendLayout>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Welcome to alex85 portfolio page" />
      </Head>
      {!postLoading && (
        <Container
          maxWidth="lg"
          component="main"
          className="classes.heroContent"
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Post
          </Typography>
          <div>{post.title}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
          ></div>
          {post.media && (
            <List>
              {post.images.map((img: any) => {
                return (
                  <ListItem key={img.id}>
                    <div>
                      <Image
                        className="classes.image"
                        src={img.url ? img.url : ''}
                        alt={img.id}
                        width={img.width}
                        height={img.height}
                      />
                    </div>
                  </ListItem>
                )
              })}
            </List>
          )}
        </Container>
      )}
    </FrontendLayout>
  )
}
export async function getStaticPaths() {
  let ids = await postService.getPostIds()
  const paths = ids.map((id: number) => {
    return { params: { id: id.toString() } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      let id = parseInt(params?.id as string)
      await store.dispatch(getPost({ id }))

      return {
        props: {},
        revalidate: false,
      }
    }
)

export default Post
