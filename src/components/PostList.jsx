
import Post from './partials/Post';

function PostList({ posts, removeFunc, updateFunc }) {
  return (
    <ul className="col-9 my-4 list-unstyled">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.titolo}
          content={post.contenuto}
          date={post.data}
          author={post.autore}
          removeFunc={removeFunc}
          updateFunc={updateFunc}
        />
      ))}
    </ul>
  );
}

export default PostList;