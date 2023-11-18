export const uploadImage = async (imagePath) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          path: imagePath,
        }),
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  };