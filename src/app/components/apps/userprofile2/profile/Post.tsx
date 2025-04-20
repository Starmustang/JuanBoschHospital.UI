import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useContext, useEffect } from "react";

import PostItem from "./PostItem";
import { PostTextBox } from "./PostTextBox";
import { PostType } from "../../../../(DashboardLayout)/types/apps/userProfile";
import { TaskCard } from "./TaskCard";
import BlankCard from "../../../shared/BlankCard";
import { UserDataContext } from "@/app/context/UserDataContext/index";
import { CardContent } from '@mui/material';




const Post = () => {
  const { posts }: PostType | any = useContext(UserDataContext);

  return (


    (<Grid container spacing={3}>
      <Grid
        size={{
          sm: 12
        }}>
        <TaskCard />
      </Grid>
      <BlankCard>
        <CardContent>
          <Grid
            size={{
              sm: 12
            }}>
            <PostTextBox />
          </Grid>
        </CardContent>
      </BlankCard>

      {posts.map((posts: any) => {
        return (
          (<Grid
            key={posts.id}
            size={{
              sm: 12
            }}>
            <BlankCard>
              <CardContent>
                <PostItem post={posts} />
              </CardContent>
            </BlankCard>
          </Grid>)
        );
      })}
    </Grid>)

  );
};

export default Post;
