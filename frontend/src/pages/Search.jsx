import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const categoryFromUrl = urlParams.get("category");
    const sortFromUrl = urlParams.get("order");
    if (searchTermFromUrl || categoryFromUrl || sortFromUrl) {
      setFormData({
        ...formData,
        searchTerm: searchTermFromUrl === null ? "" : searchTermFromUrl,
        category: categoryFromUrl === null ? "uncategorized" : categoryFromUrl,
        sort: sortFromUrl === null ? "desc" : sortFromUrl,
      });
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`api/post/getposts?${searchQuery}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        } else {
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setFormData({ ...formData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setFormData({ ...formData, sort: order });
    }

    if (e.target.id === "category") {
      const categoryInput = e.target.value || "uncategorized";
      setFormData({ ...formData, category: categoryInput });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", formData.searchTerm);
    urlParams.set("category", formData.category);
    urlParams.set("order", formData.sort);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const postsNumber = posts.length;
    const index = postsNumber;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", index);
    const searchQuery = urlParams.toString();
    const res = await fetch(`api/post/getposts?${searchQuery}`);
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);

      if (data.posts.length > 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } else {
      return;
    }
  };
  return (
    <div className="flex flex-col">
      <div className="py-10 px-7 border-b border-gray-500">
        <form className="flex items-end gap-8" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-1">
            <label className="whitespace-nowrap font-semibold">Szukaj:</label>
            <TextInput
              placeholder="Wpisz szukaną frazę..."
              id="searchTerm"
              type="text"
              value={formData.searchTerm}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="whitespace-nowrap font-semibold">
              Kategoria:
            </label>
            <Select
              onChange={handleChange}
              value={formData.category}
              id="category"
              className="w-full"
            >
              <option value="uncategorized">Wybierz kategorię</option>
              <option value="javascript">JavaScript</option>
              <option value="vue">Vue</option>
              <option value="php">PHP</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="whitespace-nowrap font-semibold">
              Sortowanie:
            </label>
            <Select
              onChange={handleChange}
              value={formData.sort}
              id="sort"
              className="w-full"
            >
              <option value="desc">Od najnowszych</option>
              <option value="asc">Od najstarszych</option>
            </Select>
          </div>
          <Button
            type="submit"
            outline
            gradientDuoTone="cyanToBlue"
            className="h-fit"
          >
            Filtruj
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl text-center font-semibold border-gray-500 p-3 mt-5 ">
          Szukane artykuły
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">
              Nie znaleziono żadnych artykułów.
            </p>
          )}
          {loading && <p className="text-xl text-gray-500">Wczytywanie...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full p-6 text-teal-500 text-lg hover:underline"
            >
              Pokaż więcej
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
