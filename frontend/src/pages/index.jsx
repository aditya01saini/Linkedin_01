import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Home() {
const router  = useRouter();

  return (
    <UserLayout>
    <div className={styles.container}>

      <div className={styles.mainContainer}>

        <div className={styles.mainContainer__left}>
          <p>Connect with Friends without Exaggeration</p>
          <p>A True Social media Platform, with stories no blufs !</p>

          <div onClick={() => {
            router.push("/login")
          }}className={styles.buttonJoin}>
            <p>Join Now</p>
          </div>

        </div>

        <div className={styles.mainContainer__right}>
          <img src="images/cycle (2).png" alt="" />

        </div>
      </div>
    </div>
    </UserLayout>
  );
}
