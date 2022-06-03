import PostPreview from '../components/PostPreview'
import {
  LoaderFunction,
  useLoaderData,
  json,
  MetaFunction,
  HeadersFunction
} from 'remix'
import { getAllPostProperties } from '~/lib/notion'

export let loader: LoaderFunction = async () => {
  let posts = await getAllPostProperties()

  return json(posts)
}

export let meta: MetaFunction = () => {
  return {
    title: 'Austin Crim | blogging about the web',
    'og:title': 'Austin Crim | blogging about the web',
    'og:image': 'https://austincrim.com/og/index.png',
    'twitter:card': 'summary_large_image'
  }
}

export let headers: HeadersFunction = () => {
  return {
    'cache-control': `s-maxage=${60 * 30}`
  }
}

export default function Blog() {
  const posts = useLoaderData()
  return (
    <div className="flex flex-col max-w-5xl mx-auto my-20 space-y-12 dark:text-gray-50 md:rounded-lg">
      <h3 className="text-4xl">Posts</h3>
      {posts.map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </div>
  )
}
