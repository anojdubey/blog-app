import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import "../styles/BlogForm.module.css";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function EditForm({ id, titles, image, contents }) {
  const [title, setTitle] = useState(titles);
  const [images, setImages] = useState(image);
  const [content, setContent] = useState(contents);
  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter();

  const handleOnChange = (editorContent) => setContent(editorContent);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const author = "Anoj";
      // let date = new Date().toDateString();
      const req = { title, images, content, author };
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
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
    <div>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Grid sx={{ maxWidth: 600, height: 600, mt: 2 }} container spacing={2}>
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
                    <SunEditor
                      onChange={handleOnChange}
                      height="100%"
                      placeholder="Start writing your blog..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Box display={"flex"} justifyContent={"center"} width={"100%"}>
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
    </div>
  );
}
