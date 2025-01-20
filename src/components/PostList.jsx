
import Post from './partials/Post';

function PostList({ posts, removeFunc, updateFunc }) {
  return (
    <ul className="col-9 my-4 list-unstyled">
      {posts.map((post) => (
        <Post
          key={"post-" + post.id}
          id={post.id}
          title={post.titolo}
          content={post.contenuto}
          date={post.data}
          author={post.autore}
          category={post.category}
          image={post.image}
          status={post.status}
          tags={post.tags}
          removeFunc={removeFunc}
          updateFunc={updateFunc}
        />
      ))}
    </ul>
  );
}

export default PostList;