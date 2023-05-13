import {
  Grid,
  Card,
  CardHeader,
  Box,
  CardContent,
  TextField,
  CardActions,
  Button,
} from "@mui/material";
import dynamic from "next/dynamic";
import "../../styles/BlogForm.module.css";
import "suneditor/dist/css/suneditor.min.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";
import Navbar from "@/components/NavigationBar";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function CreateBlog({ user }) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter();

  const handleOnChange = (editorContent) => setContent(editorContent);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // let date = new Date().toDateString();
      const req = { title, images, content, author };
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      router.push("/");
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!user ? (
        <>
          <Navbar user={user} />
          <h1
            style={{
              textAlign: "center",
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
        <>
          <Navbar user={user} />
          <Box
            sx={{ mt: "6rem" }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid
              sx={{ maxWidth: 600, height: 600, mt: 2 }}
              container
              spacing={2}
            >
              <Grid item md={12} sm={12} xs={12}>
                <Card sx={{ maxHeight: "100%" }} elevation={3}>
                  <CardHeader title="Create Blog Form"></CardHeader>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          required
                          onChange={(e) => setTitle(e.target.value)}
                          label="Title"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          required
                          onChange={(e) => setImages(e.target.value)}
                          label="Image Url"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          required
                          onChange={(e) => setAuthor(e.target.value)}
                          label="Author"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <SunEditor
                          onChange={handleOnChange}
                          height="100%"
                          placeholder="Start writing your blog..."
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      width={"100%"}
                    >
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={handleSubmit}
                        disabled={isLoading}
                        variant="contained"
                      >
                        Post
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}

export const getServerSideProps = async (req, res) => {
  let cookie = getCookies(req);
  if (!cookie) cookie = "";
  return {
    props: {
      user: cookie.username || null,
    },
  };
};
