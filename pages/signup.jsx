import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { css } from "@emotion/react";
import NavBar from "@/components/NavBar";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 16px;
    color: #333333;
    font-size: 24px;
    font-weight: 600;
  }

  .MuiTextField-root {
    margin-bottom: 16px;
  }

  .MuiButton-root {
    margin-top: 16px;
    padding: 12px 24px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access = "user";
    const req = { username, password, access };
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const data = await response.json();
    alert(response.status === 200 ? "Success" : data.message);
    router.push("/login");
  };

  return (
    <>
      <NavBar />
      <Container
        sx={{
          border: "1px solid gray",
          borderRadius: "8px",
          padding: "24px",
          mt: "24px",
        }}
        maxWidth="sm"
      >
        <form css={formStyle} onSubmit={handleSubmit}>
          <h1
            style={{
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Sign Up
          </h1>
          <TextField
            sx={{
              mb: 2,
            }}
            fullWidth
            label="User Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{
              mb: 2,
            }}
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </Box>
        </form>
        <Typography
          sx={{
            textAlign: "center",
            mt: 2,
            color: "blue",
            cursor: "pointer",
          }}
          variant="body2"
          onClick={() => router.push("/signup")}
        >
          Already have an account? Click here to{" Login"}
        </Typography>
      </Container>
    </>
  );
}

export const getServerSideProps = async (req, res) => {
  const cookie = getCookies(req);
  if (cookie.username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default SignUpForm;
