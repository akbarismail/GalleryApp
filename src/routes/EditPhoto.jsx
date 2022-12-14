import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = async (e) => {
    // TODO: answer here
    try {
      e.preventDefault();
      const response = await fetch(
        `https://gallery-app-server.vercel.app/photos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl,
            captions,
            updatedAt: new Date().toLocaleString(),
          }),
        }
      );
      await response.json();
      return navigate('/photos');
    } catch (error) {
      setError(error);
    }
  };

  const loadDataPhotoById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://gallery-app-server.vercel.app/photos/${id}`
      );
      const data = await response.json();
      setImageUrl(data?.imageUrl);
      setCaptions(data?.captions);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    // TODO: answer here
    loadDataPhotoById(id);
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          Loading...
        </h1>
      ) : (
        <div className='container'>
          <form className='edit-form' onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className='edit-input'
                type='text'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className='edit-input'
                type='text'
                value={captions}
                data-testid='captions'
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input
              className='submit-btn'
              type='submit'
              value='Submit'
              data-testid='submit'
            />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
