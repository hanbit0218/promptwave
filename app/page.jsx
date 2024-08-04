import Feed from '@components/Feed.jsx';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Explore & Exchange
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      
      <p className="desc text-center">
        Promptwave acts as an open-source AI tool designed for modern times, facilitating the discovery, creation, and sharing of inventive prompts
      </p>

      <Feed />
      
    </section>
  )
}

export default Home