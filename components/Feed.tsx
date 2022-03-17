import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestion from './Suggestion'

function Feed() {
  return (
    <main className="mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      <section className="hidden md:col-span-1 xl:inline-grid">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestion />
        </div>
      </section>
    </main>
  )
}

export default Feed
