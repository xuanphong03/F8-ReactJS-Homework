import LogoCoinbase from '~/assets/logos/coinbase.svg';
import LogoSpotify from '~/assets/logos/spotify.svg';
import LogoPinterest from '~/assets/logos/pinterest.svg';
import LogoGoogle from '~/assets/logos/google.svg';
import LogoAmazon from '~/assets/logos/amazon.svg';
import LogoNetflex from '~/assets/logos/netflix.svg';

PopularClients.propTypes = {};
function ClientLogo({ logo }) {
  return (
    <img
      src={logo}
      alt="logo"
      className="aspect-2/1 w-40 opacity-70 grayscale"
    />
  );
}
function PopularClients() {
  const CLIENTS = [
    { id: 1, logo: LogoCoinbase },
    { id: 2, logo: LogoSpotify },
    { id: 3, logo: LogoPinterest },
    { id: 4, logo: LogoGoogle },
    { id: 5, logo: LogoAmazon },
    { id: 6, logo: LogoNetflex },
  ];
  return (
    <section className="py-8">
      <div className="pb-4">
        <h3 className="text-secondaryColor mb-4 text-center font-semibold uppercase">
          Popular Clients
        </h3>
        <h2 className="text-center text-4xl font-semibold">
          Trusted by over 10,000+ <br></br> clients
        </h2>
      </div>
      <div className="mt-8 flex flex-wrap justify-around gap-6 md:justify-center">
        {CLIENTS.map(({ id, logo }) => (
          <ClientLogo key={id} logo={logo} />
        ))}
      </div>
    </section>
  );
}

export default PopularClients;
