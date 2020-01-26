const users = [
  {
    id: '1',
    name: 'Rajan',
    email: 'rajan@hello.com',
    age: 27,
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'trojanh',
    email: 'torjanh@hello.com',
    createdAt: Date.now()
  },
  {
    id: '3',
    name: 'Hello',
    email: 'hello@world.com',
    createdAt: Date.now()
  }
]

const posts = [
  {
    id: '10',
    title: 'GraphQL 1',
    body: 'GraphQL 1 body...',
    published: true,
    author: '1',
    createdAt: Date.now(),
    type: "user"
  },
  {
    id: '11',
    title: 'GraphQL 2',
    body: 'GraphQL 2 body...',
    published: false,
    author: '1',
    createdAt: Date.now(),
    type: "user"
  },
  {
    id: '12',
    title: 'Programming1',
    body: 'Programming1 body ..',
    published: true,
    author: '2',
    createdAt: Date.now(),
    type: "user"
  },
  {
    id: '13',
    title: 'Programming2',
    body: 'Programming2 body ..',
    published: true,
    author: null,
    createdAt: Date.now(),
    type: "guestUserA"
  },
  {
    id: '14',
    title: 'Programming3',
    body: 'Programming3 body ..',
    published: true,
    author: null,
    createdAt: Date.now(),
    type: "guestUserB"
  }
]

const db = {
  users,
  posts
}

export { db as default }
