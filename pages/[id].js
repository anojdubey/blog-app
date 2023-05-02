import EditForm from "@/components/EditForm";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BlogDetails({ data, id, user, access }) {
  const [editblog, setEditblog] = useState(false);
  const [prevComments, setPrevComments] = useState(data.comments);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  const postComment = async () => {
    const response = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comments: [
          ...prevComments,
          {
            username: user,
            desc: comment,
          },
        ],
      }),
    });
    const data = await response.json();
    console.log(data);
    router.reload();
  };
  useEffect(() => {
    setPrevComments(data.comments);
  }, [comment]);
  return (
    <>
      <Navbar />
      <Container>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={4}
        >
          <Grid item xs={12} md={12}>
            <h1
              style={{
                textAlign: "center",
              }}
            >
              {data.title}
            </h1>
          </Grid>
          <Grid item xs={12} md={12}>
            <img
              width={"100%"}
              height={"380px"}
              src={data.images}
              alt="image"
            />
          </Grid>
          {access === "admin" || user === data.author ? (
            <Grid item xs={12} md={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={() => setEditblog(true)}
                  variant="contained"
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                  }}
                  variant="contained"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </Grid>
          ) : null}
          <Grid item xs={12} md={12}>
            <Typography
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
              variant="body1"
            ></Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            borderTop: "1px solid #ccc",
            marginTop: "20px",
            marginBottom: "20px",
            paddingTop: "20px",
          }}
        >
          <Typography
            sx={{
              mb: "1rem",
            }}
            variant="h6"
          >
            Comments :-
          </Typography>
          {data.comments.map((comment) => (
            <Box
              sx={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <Typography>{comment.username}</Typography>
              <Typography>{comment.desc}</Typography>
            </Box>
          ))}
        </Box>
        <Stack direction={"row"}>
          <TextField
            sx={{
              mb: "1rem",
            }}
            fullWidth
            onChange={(e) => setComment(e.target.value)}
            label="Comment"
            variant="outlined"
          />
          <Button
            sx={{
              textTransform: "none",
              height: "56px",
              padding: "0 20px",
              ml: "10px",
            }}
            onClick={postComment}
            variant="contained"
          >
            Post
          </Button>
        </Stack>
      </Container>
      <Modal
        open={editblog}
        onClose={() => setEditblog(false)}
        aria-labelledby="modal-modal-title"
      >
        <EditForm
          id={id}
          image={data.images}
          contents={data.content}
          titles={data.title}
        />
      </Modal>
    </>
  );
}

export const getServerSideProps = async (req, res) => {
  const cookie = getCookies(req);
  console.log(cookie);
  const id = req.query.id;
  const response = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await response.json();
  return {
    props: {
      data: data.blog,
      id: id,
      user: cookie.username,
      access: cookie.access,
    },
  };
};
