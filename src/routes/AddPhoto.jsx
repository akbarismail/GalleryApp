import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e) => {
    // TODO: answer here
    try {
      e.preventDefault();
      const response = await fetch(
        'https://gallery-app-server.vercel.app/photos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl,
            captions,
            secret,
            createdAt: new Date().toLocaleString(),
            updatedAt: '-',
          }),
        }
      );

      await response.json();

      if (secret === 'password') {
        return navigate('/photos');
      } else {
        setError('You are not authorized');
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className='container'>
        {error && <div className='error-msg'>{error}</div>}
        <form className='add-form' onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className='add-input'
              type='text'
              data-testid='imageUrl'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className='add-input'
              type='text'
              data-testid='captions'
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className='add-input'
              type='text'
              value={secret}
              data-testid='secret'
              onChange={(e) => setSecret(e.target.value)}
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
    </>
  );
};

export default AddPhoto;
