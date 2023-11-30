db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('blogs');
db.createCollection('users');

db.users.insertOne({username: 'randy_15', name: "Password randy", passwordHash: "$2b$10$Y6OikJa4iiLGULq6OgoYMumkTpJAFB/sryuWUSlhOxS08/0Epfy6i", blogs: []});