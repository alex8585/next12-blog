import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { YourPostsSidebar } from "../components/Sidebar";
import { PostList } from "../components/Post";
import { useEffect, FC, useMemo, useState , ChangeEvent} from "react";
import postService from "../services/posts";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { getPosts, selectPostsList } from "../features/posts/postsSlice";

import { wrapper } from "../features/store";

import Image from "next/image";
import Head from "next/head";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { calcPages } from "../utils/utils";

const perPage = 6;
const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPostsList);
  const postsLoading = useAppSelector((state) => state.posts.loading);
  const page = useAppSelector((state) => state.posts.page);
  const total = useAppSelector((state) => state.posts.total);

  //console.log(page)
  console.log(posts);
  useEffect(() => {
    // console.log(page)
  });

  const countPages = calcPages(perPage, total);
  const images: Array<string> = [];

  const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [tagFilter, setTagFilter] = useState([]);

  const setCurrentImage = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  // @ts-ignore
  const handleChangePage = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    await dispatch(
      await getPosts({ page: value, perPage })
    );

  };

  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Welcome to alex85 portfolio page" />
      </Head>

      <Container maxWidth="sm" component="main" className="classes.heroContent">
          <h2>Blog</h2>
          {!postsLoading && (
          <div>
              {posts.map((post:any ) => {
                    return(
                        <div key={post.id}>
                            <div>{post.title}</div>
                        </div>
                    )
                })}
          </div>
          ) }

      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(getPosts({ page: 1, perPage }));
    console.log("1111");
    return {
      props: {},
      revalidate: Number(process.env.RE_GENERATION_SECONDS),
    };
  }
);

export default Home;

