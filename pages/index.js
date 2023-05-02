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
} from "@mui/material";
import logo from "../assets/demologo.png";
import Navbar from "@/components/NavigationBar";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.toLowerCase().includes(query));
  }
};

export default function Home({ data, user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchData = data.map((d) => ({
    title: d.title,
    author: d.author,
  }));
  console.log(searchData);

  return (
    <>
      <main>
        <Navbar user={user} />
        <Autocomplete
          id="free-solo-demo"
          options={searchData.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="freeSolo" />}
        />
        <Container
          sx={{
            mt: "2rem",
          }}
        >
          {data.map((blog) => (
            <Box key={blog._id}>
              <BlogCard
                id={blog._id}
                title={blog.title}
                content={blog.content}
                image={blog.images}
              />
            </Box>
          ))}
        </Container>
      </main>
    </>
  );
}

const BlogCard = ({ title, content, image, id }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        p: "7px",
      }}
    >
      <Grid className={styles.blogcard} container>
        <Grid item xs={3}>
          <img
            src={image ? image : logo}
            style={{
              width: "250px",
              height: "180px",
              padding: "5px",
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography
            sx={{
              mb: "1rem",
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
          ></Typography>
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
          <Button onClick={() => router.push(`/${id}`)}>Read more...</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export const getServerSideProps = async (req, res) => {
  const response = await fetch(`https://blog-app-nu-olive.vercel.app/api/blog`);
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
