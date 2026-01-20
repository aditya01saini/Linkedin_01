import { getAboutUser } from "@/config/redux/action/authAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import React, { useState, useEffect } from "react";
import Styles from "./index.module.css";
import { BASE_URL, clientServer } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/router";

export default function profilePage() {
  const router = useRouter();

  const authState = useSelector((state) => state.auth);
  const postReducer = useSelector((state) => state.postReducer);
  const [userProfile, setUserProfile] = useState({});

  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputData, setInputData] = useState({
    company: "",
    position: "",
    years: "",
  });

  const handleWorkInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({...inputData, [name]: value});
  };

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (authState.user != undefined) {
      setUserProfile(authState.user);
      let post = postReducer.posts.filter((post) => {
        return post.userId.username === authState.user.userId.username;
      });
      setUserPosts(post);
    }
  }, [authState.user, postReducer.posts]);

  // useEffect(() => {

  // }, []);

  const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    const response = await clientServer.post(
      "/update_profile_picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };

  const updateProfileData = async () => {
    const request = await clientServer.post("/user_update", {
      token: localStorage.getItem("token"),
      name: userProfile.userId.name,
    });

    const response = await clientServer.post("/update_profile_data", {
      token: localStorage.getItem("token"),
      bio: userProfile.bio,
      currentPost: userProfile.currentPost,
      pastWork: userProfile.pastWork,
      education: userProfile.education,
    });
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };

  return (
    <UserLayout>
      <DashboardLayout>
        {authState.user && userProfile.userId && (
          <div className={Styles.container}>
            <div className={Styles.backDropContainer}>
              <label
                htmlFor="profilePictureUpload"
                className={Styles.backDrop__overlay}
              >
                <p>Edit</p>
              </label>
              <input
                onChange={(e) => {
                  updateProfilePicture(e.target.files[0]);
                }}
                hidden
                type="file"
                id="profilePictureUpload"
              />
              <img
                src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                alt="backDrop"
              />
            </div>
            <div className={Styles.profileContainer__details}>
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <div style={{ flex: "0.8" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "fit-content",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <input
                      type="text"
                      className={Styles.nameEdit}
                      value={userProfile.userId.name}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          userId: {
                            ...userProfile.userId,
                            name: e.target.value,
                          },
                        });
                      }}
                    />
                    <p style={{ color: "grey" }}>
                      @{userProfile.userId.username}
                    </p>
                  </div>

                  <div>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => {
                        setUserProfile({ ...userProfile, bio: e.target.value });
                      }}
                      rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                      style={{ width: "100%" }}
                    ></textarea>
                  </div>
                </div>
                <div style={{ flex: "0.2" }}>
                  <h3>Recent Activity</h3>
                  {userPosts.map((post) => {
                    return (
                      <div key={post._id} className={Styles.postCard}>
                        <div className={Styles.card}>
                          <div className={Styles.card__profileContainer}>
                            {post.media !== "" ? (
                              <img
                                src={`${BASE_URL}/${post.media}`}
                                alt="posts"
                              />
                            ) : null}
                            :
                            <div
                              style={{ width: "3.4rem", height: "3.4 rem" }}
                            ></div>
                          </div>

                          <p>{post.body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={Styles.workHistory}>
              <h4>Work History</h4>

              <div className={Styles.workHistoryContainer}>
                {userProfile.pastWork.map((work, index) => {
                  return (
                    <div key={index} className={Styles.workHistoryCard}>
                      <p
                        styles={{
                          fontWeight: "bold",
                          display: "fex",
                          alignItems: "center",
                          gap: "0.8rem",
                        }}
                      >
                        {work.company} - {work.position}
                      </p>
                      <p>{work.years}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className={Styles.addWorkButton}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Add Work
              </button>
            </div>
            {userProfile != authState.user && (
              <div
                onClick={() => {
                  updateProfileData();
                }}
                className={Styles.connectionButton}
              >
                Update Profile
              </div>
            )}
          </div>
        )}
        {isModalOpen && (
          <div
            onClick={() => {
              setIsModalOpen(false);
            }}
            className={Styles.commentsContainer}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={Styles.allCommentsContainer}
            >
              <input
                onChange={handleWorkInputChange}
                className={Styles.inputField}
                type="text"
                placeholder="Enter Company"
                name="company"
              />
              <input
                onChange={handleWorkInputChange}
                className={Styles.inputField}
                type="text"
                placeholder="Enter position"
                name="position"
              />
              <input
                onChange={handleWorkInputChange}
                className={Styles.inputField}
                type="number"
                placeholder="Years"
                name="years"
              />

              <div onClick={() => {
                setUserProfile({...userProfile, pastWork: [...userProfile.pastWork, inputData]});
                setIsModalOpen(false);
              }} className={Styles.addWorksButton}>Add Work</div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </UserLayout>
  );
}
