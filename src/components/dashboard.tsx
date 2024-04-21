import React from "react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";
import Image from "next/image";

function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <div className="flex gap-4 w-full items-center p-4">
          <Image src="/ieee-logo.webp" alt="logo" width={50} height={50} />
          <h1 className="text-white text-xl">Dashboard</h1>
        </div>
        <Link className={styles.links} href="/">
          <div className={styles.dashItems}>
            <h1>Home</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/projects">
          <div className={styles.dashItems}>
            <h1>Projects</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/events">
          <div className={styles.dashItems}>
            <h1>Events</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/leaderboard">
          <div className={styles.dashItems}>
            <h1>Leaderboard</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/documentation">
          <div className={styles.dashItems}>
            <h1>Documentation</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/notification">
          <div className={styles.dashItems}>
            <h1>Notification</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/create">
          <div className={styles.dashItems}>
            <h1>Create</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/profile">
          <div className={styles.dashItems}>
            <h1>Profile</h1>
          </div>
        </Link>
        <Link className={styles.links} href="/more">
          <div className={styles.dashItems}>
            <h1>More</h1>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
