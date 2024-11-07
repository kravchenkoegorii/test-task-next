db = db.getSiblingDB('admin');
db.auth('admin', 'admin')

db = db.getSiblingDB('blogdb');
db.createUser({
  user: 'user',
  pwd: 'pass',
  roles: [
    {
      role: 'readWrite',
      db: 'blogdb',
    },
  ],
});

db.createCollection('posts');
db.createCollection('images');
