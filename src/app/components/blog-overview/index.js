"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";

const inittialFormData = {
  title: "",
  description: "",
};
const BlogOverView = ({ blogList }) => {
  const [onOpen, setOnOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(inittialFormData);
  const [editedBlogId, setEditedBlogId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleFormChange = async () => {
    setLoading(true);
    try {
      const apiResponse =
        editedBlogId !== null
          ? await fetch(`/api/update-blog?id=${editedBlogId}`, {
              method: "PUT",
              body: JSON.stringify(formData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(formData),
            });
      const data = await apiResponse.json();
      if (data.success) {
        setFormData(inittialFormData);
        setLoading(false);
        setOnOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (currentId) => {
    const responce = await fetch(`/api/delete-blog?id=${currentId}`, {
      method: "DELETE",
    });
    const data = await responce.json();
    if (data.success) {
      router.refresh();
    }
  };

  const handleUpdateBlog = async (currentBlog) => {
    console.log(currentBlog);
    setEditedBlogId(currentBlog._id);
    setOnOpen(true);
    setFormData({
      title: currentBlog.title,
      description: currentBlog.description,
    });
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 p-6 bg-gradient-to-r from-purple-500 to-blue-600">
      <AddNewBlog
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        loading={loading}
        setLoading={setLoading}
        formData={formData}
        setFormData={setFormData}
        handleFormChange={handleFormChange}
        inittialFormData={inittialFormData}
        editedBlogId={editedBlogId}
        setEditedBlogId={setEditedBlogId}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card key={blogItem.title} className="p-6">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="flex items-center mt-5 gap-6">
                  <Button onClick={() => handleUpdateBlog(blogItem)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteBlog(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold">
            No Blog Found! Please Add One
          </Label>
        )}
      </div>
    </div>
  );
};

export default BlogOverView;
