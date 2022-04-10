import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect, FC, useMemo, useState } from 'react'
//import { CategoryType, PostType } from "../interfaces/post";
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { getTags, selectTagsList } from '../features/tags/tagsSlice'
import {
  getPortfolios,
  selectPortfoliosList,
} from '../features/portfolios/portfoliosSlice'
import { wrapper } from '../features/store'

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
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import FrontendLayout from '../components/FrontendLayout'
const perPage = 6
const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const dispatch = useAppDispatch()
  //  const loadingButton = useAppSelector(selectLoadingButton)
  //const postList = useAppSelector(selectPostList)
  //const [page, setPage] = useState(2)

  // const handleLoadMore = () => {
  //    dispatch(getPostList({ pagesize, currPage: page }))
  //    setPage(page + 1)
  //  }

  //const portfLoding = useAppSelector(portfoliosLoading)
  const tags = useAppSelector(selectTagsList)

  const portfolios = useAppSelector(selectPortfoliosList)

  const portfoliosLoading = useAppSelector((state) => state.portfolios.loading)
  const page = useAppSelector((state) => state.portfolios.page)
  const total = useAppSelector((state) => state.portfolios.total)

  //console.log(page)
  console.log(portfolios)
  useEffect(() => {
    // console.log(page)
  })

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

  const handletagFilter = async (id: number) => {
    const tmpTagFilter = [...tagFilter]
    const index = tmpTagFilter.indexOf(id as never)
    if (index !== -1) {
      tmpTagFilter.splice(index, 1)
    } else {
      tmpTagFilter.push(id as never)
    }

    await dispatch(
      await getPortfolios({ page: 1, perPage, tags: tmpTagFilter })
    )
    setTagFilter(tmpTagFilter)
  }

  // @ts-ignore
  const handleChangePage = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    //          const tmpTagFilter = [...tagFilter];

    await dispatch(
      await getPortfolios({ page: value, perPage, tags: tagFilter })
    )

    // setTagFilter(tmpTagFilter);
    /// dispatch(await getPortfolios({ page: 1, perPage:2, tags: tmpTagFilter }));
  }

  return (
    <FrontendLayout>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Welcome to alex85 portfolio page" />
      </Head>

      <Container maxWidth="sm" component="main" className="classes.heroContent">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Portfolio
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        ></Typography>
      </Container>
      <Container maxWidth="md" component="main" className="classes.heroContent">
        {portfoliosLoading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size="80px" />
          </Box>
        )}
        {!portfoliosLoading && (
          <div>
            <ul className="classes.paper">
              {[...tags].map((tag) => {
                return (
                  <li
                    key={tag.id}
                    className={
                      tagFilter.includes(tag.id as never) ? 'active' : ''
                    }
                  >
                    <Chip
                      label={tag.name}
                      onClick={() => handletagFilter(tag.id)}
                      className="classes.chip"
                    />
                  </li>
                )
              })}
            </ul>

            <Grid container spacing={5} alignItems="flex-end">
              {portfolios.map((portfolio, i) => {
                const fullImg = portfolio.image
                  ? API_DOMAIN + portfolio.image
                  : ''
                images.push(fullImg)

                return (
                  <Grid item key={portfolio.name} xs={12} sm={6} md={4}>
                    <Card className="classes.card">
                      <CardHeader
                        title={portfolio.name}
                        subheader=""
                        className="classes.cardHeader"
                      />
                      <Image
                        className="classes.image"
                        onClick={() => setCurrentImage(i)}
                        src={
                          portfolio.thumb ? API_DOMAIN + portfolio.thumb : ''
                        }
                        alt={portfolio.name}
                        width={300}
                        height={200}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        ></Typography>
                        <Paper component="ul" className="classes.paper">
                          {[...portfolio.tags].map((tag) => {
                            return (
                              <li key={tag.id}>
                                <Chip
                                  label={tag.name}
                                  className="classes.chip"
                                />
                              </li>
                            )
                          })}
                        </Paper>
                        {portfolio.url.indexOf('github') !== -1 && (
                          <Button
                            target="_blank"
                            className="classes.button"
                            variant="contained"
                            color="secondary"
                            href={portfolio.url}
                          >
                            Github
                          </Button>
                        )}
                        {portfolio.url.indexOf('github') === -1 && (
                          <Button
                            target="_blank"
                            className="classes.button"
                            variant="contained"
                            color="primary"
                            href={portfolio.url}
                          >
                            View
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>

            <div className="classes.paginatorContainer">
              <Pagination
                page={page}
                count={countPages}
                onChange={handleChangePage}
                className="classes.pagination"
              />
            </div>
          </div>
        )}
      </Container>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </FrontendLayout>
  )
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(getPortfolios({ page: 1, perPage }))
    await store.dispatch(getTags())
    console.log('1111')
    return {
      props: {},
      revalidate: Number(process.env.RE_GENERATION_SECONDS),
    }
  }
)

export default Home
