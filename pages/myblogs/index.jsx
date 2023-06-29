import Navbar from "@/components/NavigationBar";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";

export default function BlogInfo({ data, user }) {
  const router = useRouter();
  console.log(data);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      {!user ? (
        <>
          <Navbar user={user} />
          <h1
            style={{
              textAlign: "center",
              marginTop: "5rem",
            }}
          >
            Please Login First{" "}
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                fontStyle: "underline",
              }}
              onClick={() => router.push("/login")}
            >
              Click Here
            </span>
          </h1>
          {mobile && <Footer />}
        </>
      ) : (
        <main>
          <Navbar user={user} />
          <Container
            sx={{
              mt: "6rem",
              mb: mobile && "4rem",
            }}
          >
            {data?.blog?.map((blog) => (
              <BlogCard
                id={blog._id}
                title={blog.title}
                content={blog.content}
                image={blog.images}
              />
            ))}
          </Container>
          {mobile && <Footer />}
        </main>
      )}
    </div>
  );
}

const BlogCard = ({ title, content, image, id }) => {
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        borderRadius: "5px",
        mb: "1rem",
        mt: "1rem",
      }}
      onClick={() => router.push(`/${id}`)}
    >
      <Grid justifyContent={"center"} alignItems={"center"} container>
        <Grid item xs={3}>
          <img
            src={image ? image : logo}
            style={{
              width: mobile?"100%":"100%",
              height: mobile?"75px":"150px",
              objectFit: "cover",
              marginRight: "1rem",
              padding: "5px",
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography
            sx={{
              mb: "1rem",
              fontSize: mobile && "1rem",
            }}
            variant="h6"
          >
            {title}
          </Typography>
          {!mobile && (
          <Typography
            dangerouslySetInnerHTML={{
              __html: content,
            }}
            className={styles.blogcard__content}
            variant="body1"
          ></Typography>)}
        </Grid>
      </Grid>
    </Box>
  );
};

export const getServerSideProps = async (req, res) => {
  let cookie = getCookies(req);
  let data = [];
  let user = cookie.username;
  if (!cookie) cookie = "";
  if (user) {
    const response = await fetch(`https://blog-app-anoj.vercel.app/api/myblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user }),
    });
    data = await response.json();
  }
  return {
    props: {
      data: data || null,
      user: cookie.username || null,
    },
  };
};
