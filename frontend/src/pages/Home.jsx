import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("api/post/getposts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-5 p-28 px-3 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Witaj na moim blogu!</h1>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          ratione, nam corrupti recusandae quam architecto mollitia saepe dicta
          cumque itaque illum repellat reprehenderit temporibus repellendus
          tempora aliquid natus porro sed.
        </p>
        <Link to="/search">
          <Button outline gradientDuoTone="cyanToBlue">
            Zobacz wszystkie posty
          </Button>
        </Link>
      </div>
      <div className="p-3 max-w-7xl mx-auto">
        <CallToAction />
      </div>
      <div className="max-w-7xl mx-auto p-3 gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Ostatnie artykuły
            </h2>
            <div className="flex items-center justify-center flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              Zobacz wszystkie artykuły
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
