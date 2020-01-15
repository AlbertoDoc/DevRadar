import React, {useEffect, useState} from 'react';

export default function DevForm({ onSubmit }){
    const [github_username, setGitHubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) =>{
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        );
    }, []);

    async function handleSubmit(e) {
        // Evita que o form leve a navegacao para outra pagina
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
          });

          setGitHubUsername('');
          setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className='input-block'>
            <label htmlFor='github_username'>Usuário do GitHub</label>
            <input
              name='github_username'
              id='github_username'
              required
              value={github_username}
              onChange={e => {setGitHubUsername(e.target.value)}}
            />
          </div>

          <div className='input-block'>
            <label htmlFor='techs'>Tecnologias</label>
            <input
              name='techs'
              id='techs'
              required
              value={techs}
              onChange={e => {setTechs(e.target.value)}}
            />
          </div>  

          <div className='input-group'>
            <div className='input-block'>
              <label htmlFor='latitude'>Latitude</label>
              <input
                type='number'
                name='latitude'
                id='latitude'
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='longitude'>Longitude</label>
              <input
                type='number'
                name='longitude'
                id='longitude'
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>

          </div>

          <button type='submit'>Salvar</button>
        </form>
    );
}