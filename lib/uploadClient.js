/**
 * Upload a file to the admin media endpoint. Returns a public path (e.g. /assets/uploads/...).
 */
export async function uploadMediaFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || "Upload failed");
  }
  return data.path;
}
