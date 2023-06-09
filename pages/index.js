import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../assets/demologo.png";
import Navbar from "@/components/NavigationBar";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function Home({ data, user }) {
  const searchData = data.map((d) => ({
    title: d.title,
    author: d.author,
  }));
  const mapdata = data.slice(1, data.length);
  console.log(searchData);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <main
        style={{
          backgroundColor: "#f5f5f5",
          height: "100%",
          overflow: "hidden",
          marginBottom: mobile && "3rem",
          "&::WebkitScrollbar": {
            display: "none",
          },
        }}
      >
        <Navbar user={user} />
        {/* <Autocomplete
          id="free-solo-demo"
          options={searchData.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="freeSolo" />}
        /> */}
        <Grid
          container
          sx={{
            mt: "6rem",
            zIndex: 1,
            p: "1rem",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              p: "2rem",
              overflowY: "hidden",
              "::webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <RecommendCard
              title={data[0].title}
              content={data[0].content}
              image={data[0].images}
              id={data[0]._id}
              user={user}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              overflowY: "scroll",
              height: "81vh",
              webkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {mapdata.map((blog) => (
              <Box key={blog._id}>
                <BlogCard
                  id={blog._id}
                  title={blog.title}
                  image={blog.images}
                  user={user}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
        {mobile && <Footer />}
      </main>
    </>
  );
}
const RecommendCard = ({ title, content, image, id, user }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        mt: -5,
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => (user ? router.push(`/${id}`) : router.push("/login"))}
    >
      <Grid className={styles.blogcard} container>
        <Grid item xs={12}>
          <img
            src={image ? image : logo}
            style={{
              width: "100%",
              height: "63vh",
              marginBottom: "1rem",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              mb: "1rem",
              fontWeight: "600",
            }}
            variant="h6"
          >
            {title}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{
              __html: content,
            }}
            className={styles.blogcard__content}
            variant="body1"
          />
          {/* <IconButton
            sx={{
              mt: "1rem",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mr: "1rem",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/${id}`)}
          >
            <Typography
              sx={{
                color: "blue",
              }}
              variant="body2"
            >
              Read More ...
            </Typography>
          </IconButton> */}
        </Grid>
      </Grid>
    </Box>
  );
};

const BlogCard = ({ title, image, id, user }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        p: "7px",
        ml: "1rem",
        mt: "0.5rem",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => (user ? router.push(`/${id}`) : router.push("/login"))}
    >
      <Grid
        className={styles.blogcard}
        justifyContent={"center"}
        alignItems={"center"}
        container
      >
        <Grid item xs={9}>
          <img
            src={image ? image : logo}
            style={{
              width: "100%",
              height: "30vh",
              borderRadius: "10px",
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography
            sx={{
              mb: "1rem",
              width: "100%",
              fontWeight: "500",
              fontSize: "1.2rem",
            }}
          >
            {title}
          </Typography>
          {/* <Typography
            dangerouslySetInnerHTML={{
              __html: content,
            }}
            className={styles.blogcard__content}
            variant="body1"
          /> */}
          {/* <IconButton
            sx={{
              mt: "1rem",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mr: "1rem",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/${id}`)}
          >
            <Typography
              sx={{
                color: "blue",
              }}
              variant="body2"
            >
              Read More ...
            </Typography>
          </IconButton> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export const getServerSideProps = async (req, res) => {
  const response = await fetch(`https://blog-app-anoj.vercel.app/api/blog`);
  const data = await response.json();
  let cookie = getCookies(req);
  if (!cookie) cookie = "";
  console.log(data);
  return {
    props: {
      data: data.blogs,
      user: cookie.username || null,
    },
  };
};
