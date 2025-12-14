import { getAboutUser } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setTokenIsNotThere } from "@/config/redux/reducer/authReducer";
// import { setTokenIsThere } from "@/config/redux/reducer/authReducer";

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
  }, [authState.isTokenThere]);

  return (
    <UserLayout>

    <DashboardLayout>
      <div>
        <h1>Dashbord</h1>
      </div>
    </DashboardLayout>

    </UserLayout>
    
  );
}
