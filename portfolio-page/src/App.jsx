import QuickLink from './components/QuickLink';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './layouts/Main';
import ContactUs from './sections/ContactUs';
import FeedbackAboutMe from './sections/FeedbackAboutMe';
import Introduction from './sections/Introduction';
import MyAwesomeClients from './sections/MyAwesomeClients';
import MyProjects from './sections/MyProjects';
import MyResume from './sections/MyResume';
import MySkills from './sections/MySkills';
import PopularClients from './sections/PopularClients';

function App() {
  return (
    <div className="font-roboto text-primaryColor">
      <Header />
      <Main>
        <Introduction />
        <MyAwesomeClients />
        <MySkills />
        <MyProjects />
        <MyResume />
        <FeedbackAboutMe />
        <PopularClients />
        <ContactUs />
      </Main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-50">
        <QuickLink />
      </div>
    </div>
  );
}

export default App;
