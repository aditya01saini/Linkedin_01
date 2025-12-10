import UserLayout from "@/layout/UserLayout";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { registerUser } from "../../config/redux/action/authAction";

export default function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [userLoginMethod, setUserLoginMethod] = useState(false);

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  } , [authState.loggedIn]);

  const handleRegister = () => {
    console.log("wlkjhfefhe");
    dispatch(registerUser({username, password, email, name}));

  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer__left}>
            <p className={styles.cardleft__heading}>
              {" "}
              {userLoginMethod ? "Sign In" : "Sign Up"}
            </p>
            <p style={{color: authState.isError ? "red" : "green"}}>{authState.message.message}</p>

            <div className={styles.inputContainers}>
              <div className={styles.inputRow}>
                <input onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="username"
                />
                <input onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="name"
                />
              </div>
              <input onChange={(e) => setEmailAddress(e.target.value)}
                className={styles.inputField}
                type="email"
                placeholder="email"
              />
              <input onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                type="password"
                placeholder="password"
              />

              <div  onClick={() => {
                if(userLoginMethod) {

                }else{
                  handleRegister();
                }
              }} className={styles.buttonWithOutline}>
                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>
            </div>
          </div>

          <div className={styles.cardContainer__right}></div>
        </div>
      </div>
    </UserLayout>
  );
}
