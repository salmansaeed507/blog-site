import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getToken } from '../authFunc';
import { UploadedFile } from '../types/uploaded-file.interface';

export function UploadImage(props: any) {
  const [image, setImage] = useState<UploadedFile>({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      return false;
    }
    setIsLoading(true);
    uploadImage(file)
      .then((data) => {
        setImage(data?.data as UploadedFile);
        props.onChange && props.onChange(data?.data);
      })
      .catch((e) => {
        alert(e.response?.data?.message);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return true;
  }

  function uploadImage(file: any) {
    return axios.post(
      process.env['NX_API_URL'] + 'upload/image',
      { file },
      {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + getToken(),
        },
      }
    );
  }

  function handleRemove() {
    setIsLoading(true);
    axios
      .delete(process.env['NX_API_URL'] + 'upload', {
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
        data: {
          file: image.filename,
        },
      })
      .then((data) => {
        setImage({});
      })
      .catch((e) => {
        alert('There was some issue while deleting file');
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {image.url ? (
        <>
          <p>
            <Image
              src={image.url}
              style={{ width: '200px', height: '200px' }}
            />
          </p>
          <p>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" onClick={handleRemove}>
                Remove
              </Button>
            )}
          </p>
        </>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" component="label">
          Upload
          <input hidden type="file" onChange={(e) => handleChange(e)} />
        </Button>
      )}
    </>
  );
}
