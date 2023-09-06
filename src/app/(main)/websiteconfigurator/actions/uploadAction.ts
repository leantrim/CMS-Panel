"use server";

export async function handleUpload(file: File) {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return { imageUrl: data.message, error: "" };
    } else {
      return { error: data.message };
    }
  } else {
    throw new Error("No file selected");
  }
}
