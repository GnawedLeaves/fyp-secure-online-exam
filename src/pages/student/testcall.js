import React from 'react';
import Tesseract from 'tesseract.js';

const Testcall = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState(null); // Changed initial state to null
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Convert Blob URL to Data URL
      const dataUrl = await blobToDataURL(image);
      Tesseract.recognize(dataUrl, 'eng', {
        logger: (m) => {
          console.log(m);
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100));
          }
        },
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result) => {
          console.log(result.data);
          setText(result.data.text);
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Error converting Blob URL to Data URL:', error);
      setIsLoading(false);
    }
  };

  // Function to convert Blob URL to Data URL
  const blobToDataURL = (blobUrl) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', blobUrl);
      xhr.responseType = 'blob';
      xhr.send();
    });
  };

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
          {!isLoading && (
            <h1 className="text-center py-5 mc-5">Image To Text</h1>
          )}
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting: {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Convert"
              />
            </>
          )}
          {!isLoading && text && image && (
            <>
              <textarea
                className="form-control w-100 mt-5"
                rows="30"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <img
                src={image} // Use the converted Data URL directly
                className="mt-3"
                style={{ maxWidth: '25%', height: 'auto' }}
                alt="Converted Image"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testcall;
