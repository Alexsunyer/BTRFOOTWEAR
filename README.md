# BTRFOOTWEAR 👟

BTRFOOTWEAR is a footwear e-commerce, where the user can register and log in, navigate between different categories of footwear and manage their cart to later process an order.

## Features

- Login and registration.
- Navigation between categories.
- Product finder by name.
- Management of the shopping cart and the quantities of each product.
- Advanced forms.
- Error management and error messages.

## Tech Stack

**Database:** Postgres

**Client:** React, Redux, Sass, TailwindCSS

**Server:** Node, Express, Sequelize, Jest, Docker

**Syntax:** Typescript

## Run Locally

Download and open Docker Desktop

Download PostgreSQL (_optionally pgAdmin_)

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd BTRFOOTWEAR
```

Go to the backend directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Create _.env_ file exactly the same as _template.env_ and put your Postgres info to connect to database

Start the server

```bash
  npm run docker_dev
```

Go to the frontend directory

```bash
  cd Frontend
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm start
```

**ENJOY!**
