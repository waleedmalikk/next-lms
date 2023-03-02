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

import { useEffect, useState } from "react";

export default function Edit() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  useEffect(() => {
    setEmail(router.query.email);
    setUsername(router.query.username);
  }, [router.query]);

  async function editUser(e) {
    e.preventDefault();
    if (checks.isStringEmpty(email)) {
      alert("email cannot be empty.");
      return;
    }
    if (!checks.minMax(email, 5, 40)) {
      alert("email length must be between 5 to 40 characters.");
      return;
    }

    if (checks.isStringEmpty(username)) {
      alert("password cannot be empty.");
      return;
    }
    if (!checks.minMax(username, 5, 40)) {
      alert("password length must be between 5 to 40 characters.");
      return;
    }

    if (confirm("Are you sure you want to update this user?")) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, username: username }),
      };
      // console.log(requestOptions);

      const response = await fetch(
        `http://localhost:3000/api/users/update/${router.query.id}`,
        requestOptions
      );
      const data = await response.json();
      // console.log(data);
      
      if (response.status !== 200) {
        alert(data.msg);
      } else {
        alert("User updated successfully.");
        router.push("/table");
      }
    }
  }
  return (
    <>
      <Head>
        <title>Update</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <form onSubmit={editUser}>
          <div className={styles.form_container2}>
            <FormControl className={styles.form}>
              <InputGroup className={styles.group}>
                <FormLabel className={styles.label}>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </InputGroup>
              <InputGroup className={styles.group}>
                <FormLabel className={styles.label}>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </InputGroup>
              <Button type="submit" className={styles.login_button}>
                Save Changes
              </Button>
            </FormControl>
            <Link href="/table">Go back</Link>
          </div>
        </form>
      </main>
    </>
  );
}
