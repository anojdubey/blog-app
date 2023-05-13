import Navbar from "@/components/NavigationBar";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

export default function BlogInfo({ data, user }) {
  const router = useRouter();
  console.log(data);
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
        </>
      ) : (
        <main>
          <Navbar user={user} />
          <Container
            sx={{
              mt: "6rem",
            }}
          >
            {data.blog.map((blog) => (
              <BlogCard
                id={blog._id}
                title={blog.title}
                content={blog.content}
                image={blog.images}
              />
            ))}
          </Container>
        </main>
      )}
    </div>
  );
}

const BlogCard = ({ title, content, image, id }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        borderRadius: "5px",
        mb: "1rem",
        mt: "1rem",
      }}
    >
      <Grid container>
        <Grid item xs={3}>
          <img
            src={image ? image : logo}
            style={{
              width: "250px",
              height: "150px",
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
          <Box
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
              Read More
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export const getServerSideProps = async (req, res) => {
  let cookie = getCookies(req);
  let data;
  let user = cookie.username;
  if (!cookie) cookie = "";
  if (user) {
    const response = await fetch(
      `https://blog-app-nu-olive.vercel.app/api/myblog/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      }
    );
    data = await response.json();
  }
  console.log(data);
  return {
    props: {
      data: data || null,
      user: cookie.username || null,
    },
  };
};
