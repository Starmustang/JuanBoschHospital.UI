'use client'
import Grid from '@mui/material/Grid2'
import { useContext, useEffect } from 'react';
import PostItem from './PostItem';
import { PostTextBox } from './PostTextBox';
import { UserDataContext } from "@/app/context/UserDataContext/index";


const Post = () => {
  const { posts }: any = useContext(UserDataContext);
  return (
    (<Grid container spacing={3}>
      <Grid
        size={{
          sm: 12
        }}>
        <PostTextBox />
      </Grid>
      {posts.map((posts: any) => {
        return (
          (<Grid
            key={posts.id}
            size={{
              sm: 12
            }}>
            <PostItem post={posts} />
          </Grid>)
        );
      })}
    </Grid>)
  );
};

export default Post;
