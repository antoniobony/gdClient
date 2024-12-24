import React, { useState } from 'react';
import axios from 'axios';

const UploadImages = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    const base64Images = await Promise.all(
      images.map((image) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      })
    );

    // Envoyer les images encodées au backend
    try {
      const response = await axios.post('http://localhost:8080/api/upload', {
        images: base64Images,
      });
      console.log('Upload réussi :', response.data);
    } catch (error) {
      console.error('Erreur lors de l’upload :', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <button onClick={handleUpload}>Téléverser</button>
    </div>
  );
};

export default UploadImages;
