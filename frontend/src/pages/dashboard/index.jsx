import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { BASE_URL } from "@/config";

export default function dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  // const [isTokenThere, setIsTokenThere] = useState(false);



  useEffect(() => {
    if (authState.isTokenThere) {
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }

     if(!authState.all_profiles_fetched) {
        dispatch(getAllUsers());
      }
  }, [authState.isTokenThere]);

if(authState.user){



  return (   // get User and profile
    <UserLayout>

    <DashboardLayout>
      <div className="scrollComponent">
        <div className={styles.createPostContainer}>
          <img src={`${BASE_URL}/${authState.user.userId.profilePicture}`} alt="" />


        </div>
      </div>

  
    </DashboardLayout>

    </UserLayout>
    
  )
 

  } else {

    return (
      <UserLayout>
        <DashboardLayout>
          <h2>Loading</h2>
        </DashboardLayout>
      </UserLayout>
    )


}
}
