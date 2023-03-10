import Head from "next/head";
import { useRouter } from "next/router";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Input,
  Link,
  FormHelperText,
  FormErrorMessage,
  Box,
  Image,
} from "@chakra-ui/react";
import styles from "@pages/styles/Home.module.css";
import * as checks from "@pages/lib/server_checks";
// import * as dotenv from "dotenv";
// dotenv.config();

import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function submit_handler(event) {
    event.preventDefault();
    if (checks.isStringEmpty(email)) {
      alert("email cannot be empty.");
      return;
    }
    if (!checks.minMax(email, 5, 40)) {
      alert("email length must be between 5 to 40 characters.");
      return;
    }

    if (checks.isStringEmpty(password)) {
      alert("password cannot be empty.");
      return;
    }
    if (!checks.minMax(password, 5, 40)) {
      alert("password length must be between 5 to 40 characters.");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    // console.log(requestOptions);

    const response = await fetch(
      "http://localhost:3000/api/users/login",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 200) {
      alert(data.msg);
    } else {
      router.push("/table");
    }
  }
  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Box className={styles.logo_box}>
          <Image className={styles.logo} src="/library_logo.svg" />
        </Box>
        <form onSubmit={submit_handler}>
          <div className={styles.form_container1}>
            <div className={styles.form_container2}>
              <FormControl className={styles.form}>
                <InputGroup className={styles.group}>
                  <FormLabel className={styles.label}>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
                <InputGroup className={styles.group}>
                  <FormLabel className={styles.label}>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
                <Button type="submit" className={styles.login_button}>
                  Login
                </Button>
              </FormControl>
              <Link href="/sign_up">Don't have an Account? Sign up Here.</Link>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
