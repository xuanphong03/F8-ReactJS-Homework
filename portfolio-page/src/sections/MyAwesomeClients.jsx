import LogoCoinbase from '~/assets/logos/coinbase.svg';
import LogoSpotify from '~/assets/logos/spotify.svg';
import LogoPinterest from '~/assets/logos/pinterest.svg';
import LogoGoogle from '~/assets/logos/google.svg';
import LogoAmazon from '~/assets/logos/amazon.svg';
import LogoNetflex from '~/assets/logos/netflix.svg';
function MyAwesomeClients() {
  return (
    <section id="awesome-clients" className="py-28">
      <div className="mx-0 flex flex-col items-center gap-8 sm:mx-5 md:mx-0">
        <h2 className="text-base font-semibold text-[#263228]">
          My awesome clients
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <img
            className="aspect-2/1 w-40"
            src={LogoCoinbase}
            alt="logo coinbase"
          />
          <img
            className="aspect-2/1 w-40"
            src={LogoSpotify}
            alt="logo spotify"
          />
          <img
            className="aspect-2/1 w-40"
            src={LogoPinterest}
            alt="logo pinterest"
          />
          <img className="aspect-2/1 w-40" src={LogoGoogle} alt="logo google" />
          <img className="aspect-2/1 w-40" src={LogoAmazon} alt="logo amazon" />
          <img
            className="aspect-2/1 w-40"
            src={LogoNetflex}
            alt="logo netflix"
          />
        </div>
      </div>
    </section>
  );
}

export default MyAwesomeClients;
