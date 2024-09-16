/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Avatar01 from '~/assets/images/avatar1.jpg';
import Avatar02 from '~/assets/images/avatar2.jpg';
import Avatar03 from '~/assets/images/avatar3.jpg';

function ClientsList({ clients = [], activeClientId, onSelectClient }) {
  const handleClickAvatar = (id) => {
    if (!onSelectClient) return;
    onSelectClient(id);
  };
  return (
    <div className="flex gap-6">
      {clients.map(({ id, avatar }) => (
        <div
          key={id}
          className="relative size-9 overflow-hidden rounded-md"
          onClick={() => handleClickAvatar(id)}
        >
          <img className="max-w-full object-cover" alt="avatar" src={avatar} />
          <div
            className={`absolute inset-0 bg-white ${id === activeClientId ? 'bg-opacity-0' : 'bg-opacity-50'}`}
          ></div>
        </div>
      ))}
    </div>
  );
}
function FeedbackAboutMe() {
  const CLIENTS = [
    { id: 1, avatar: Avatar01 },
    { id: 2, avatar: Avatar02 },
    { id: 3, avatar: Avatar03 },
  ];
  const [currentClientId, setCurrentClientId] = useState(3);
  const [currentClientAvatar, setCurrentClientAvatar] = useState(() => {
    const currentClient = CLIENTS.find(({ id }) => id === currentClientId);
    return currentClient ? currentClient.avatar : null;
  });
  const handleSelectClient = (id) => {
    if (!id || currentClientId === id) {
      return;
    }
    const { avatar } = CLIENTS.find(({ id: _id }) => _id === id);
    setCurrentClientId(id);
    setCurrentClientAvatar(avatar);
  };

  return (
    <section id="feedback" className="container mx-auto max-w-screen-lg py-12">
      <div className="mb-20 sm:mx-5 md:mx-0">
        <h2 className="mb-4 text-center text-4xl font-semibold tracking-wider">
          What Clients Say
        </h2>
        <p className="mx-auto block w-full px-4 text-center font-sans text-xl font-normal leading-relaxed !text-gray-500 text-inherit antialiased lg:w-8/12">
          Discover what clients have to say about their experiences working with
          me. My client's satisfaction is my greatest achievement!
        </p>
      </div>
      <div className="pt-8">
        <div className="flex flex-col gap-5 p-6 lg:flex-row">
          <div>
            <h3 className="mb-4 max-w-[50%] text-3xl font-bold leading-normal">
              Mobile App Development
            </h3>
            <p className="mb-3 text-base leading-relaxed text-secondaryColor lg:max-w-[70%]">
              I had the pleasure of working with Lily on a critical web
              development project, and I can confidently say that their
              expertise and professionalism exceeded my expectations.
            </p>
            <h6 className="mb-1 font-semibold">Michael - Technical Manager</h6>
            <p className="mb-5 text-sm text-secondaryColor">
              Marketing @ APPLE INC.
            </p>
            <div>
              <ClientsList
                clients={CLIENTS}
                onSelectClient={handleSelectClient}
                activeClientId={currentClientId}
              />
            </div>
          </div>
          <img
            className="h-80 w-72 rounded-md object-cover"
            src={currentClientAvatar}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackAboutMe;
