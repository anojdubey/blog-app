import EditForm from "@/components/EditForm";
import Navbar from "@/components/NavigationBar";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import profile from "../assets/profilepic.png";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function BlogDetails({ data, id, user, access }) {
  const [editblog, setEditblog] = useState(false);
  const [prevComments, setPrevComments] = useState(data.comments);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleDelete = async () => {
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  const handleDuplicate = async () => {
    await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        images: data.images,
        author: user,
      }),
    }).then((res) => alert("Blog Duplicated"));
  };

  const postComment = async () => {
    const response = await fetch(`/api/blog/${id}`, {
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
      <Navbar user={user} />
      <Box
        sx={{
          m: mobile ? "1rem" : "4rem",
          mt: "6rem",
          mb:mobile && "3rem",
        }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={4}
        >
          <Grid item md={7.5} xs={12}>
            <img
              width={"100%"}
              height={mobile ? "250px":"550px"}
              src={data.images}
              alt="image"
            />
            <Grid container justifyContent={"center"} alignItems={"center"}>
              {access === "admin" ? (
                <Grid item md={6} xs={12}>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    direction="row"
                    spacing={2}
                  >
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
                    <Button
                      sx={{
                        textTransform: "none",
                      }}
                      variant="contained"
                      onClick={handleDuplicate}
                    >
                      Duplicate Post
                    </Button>
                  </Stack>
                </Grid>
              ) : user === data.author ? (
                <Grid item md={6} xs={12}>
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
                </Grid>
              ) : (
                <Grid itemmd={3} xs={12}>
                  <Button
                    sx={{
                      textTransform: "none",
                    }}
                    variant="contained"
                    onClick={handleDuplicate}
                  >
                    Duplicate Post
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            sx={{
              overflowY: "scroll",
              webkitOverflowScrolling: "touch",
              height: "85vh",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            item
            md={4.5} xs={12}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {data.title}
            </h1>
            <Typography
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
              variant="body1"
            ></Typography>
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
                Comments
              </Typography>
              {data.comments.map((comment) => (
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <Image src={profile} width={"20%"} height={50} />
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {comment.username}
                    </Typography>
                    <Typography>{comment.desc}</Typography>
                  </Box>
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
          </Grid>
        </Grid>
      </Box>
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
      {mobile && <Footer />}

    </>
  );
}

export const getServerSideProps = async (req, res) => {
  const cookie = getCookies(req);
  console.log(cookie);
  const id = req.query.id;
  const response = await fetch(`/api/blog/${id}`);
  const data = await response.json();
  return {
    props: {
      data: data.blog,
      id: id,
      user: cookie.username || "",
      access: cookie.access || "",
    },
  };
};
