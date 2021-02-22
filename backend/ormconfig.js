module.exports = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "solus",
    "password": "solus",
    "database": "solus",
    "entities": [
      process.env.NODE_ENV === 'test' ? '**/*.entity.{ts,js}' : 'dist/**/*.entity{.ts,.js}'
    ],
    "synchronize": true,
    "seeds": ["src/seeds/**/*{.ts,.js}"],
    "factories": ["src/factories/**/*{.ts,.js}"]   
}