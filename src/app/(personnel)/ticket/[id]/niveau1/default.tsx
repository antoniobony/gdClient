import PageNiveau1 from "./page";

export default function Default({params,children}:{params:{id:string},children:React.ReactNode}){
    return (<>
                <PageNiveau1 params={params} children={children}/>
            </>) 
} 

/**
 * const ImageGallery = () => {
  const [imageIds, setImageIds] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageIds = async () => {
      const response = await fetch('http://localhost:8080/api/images'); // API qui retourne une liste d'IDs
      const ids = await response.json();
      setImageIds(ids);
    };

    fetchImageIds();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = imageIds.map(id =>
        fetch(`http://localhost:8080/api/image/${id}`).then(res => res.text())
      );
      const results = await Promise.all(promises);
      setImages(results);
    };

    if (imageIds.length > 0) fetchImages();
  }, [imageIds]);

  return (
    <div>
      {images.map((img, index) => (
        <img key={index} src={`data:image/png;base64,${img}`} alt={`Image ${index}`} />
      ))}
    </div>
  );
};

 */