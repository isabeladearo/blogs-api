# Blogs API

Essa aplicação foi um dos projetos avaliativos do módulo de backend no curso de desenvolvimento web na Trybe. 
O objetivo foi desenvolver uma API e um banco de dados para a produção de conteúdo para um blog! 

A aplicação foi desenvolvida em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.
  1. Os endpoints estão conectados ao banco de dados seguindo os princípios do REST;
  2. Para fazer um post, foi necessário usuário e login, portanto foi trabalhado a **relação entre** `user` e `post`; 
  3. Foi necessário a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

Utilize o docker para rodar o projeto:
  1. Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`;
  2. A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;
  3. Use o comando `docker exec -it blogs_api bash` para rodar via CLI. Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano;
  4. Instale as dependências com `npm install` (Instale dentro do container);
  5. Insira o comando `npm run debug` para rodar a aplicação.

---

## Requisitos do Projeto

  - 1 - Crie migrations para as entidades User, Categories, BlogPosts, PostCategories
  - 2 - Crie o modelo 'User' em 'src/database/models/user.js' com as propriedades corretas
  - 3 - Sua aplicação deve ter o endpoint POST `/login`
  - 4 - Sua aplicação deve ter o endpoint POST `/user`
  - 5 - Sua aplicação deve ter o endpoint GET `/user`
  - 6 - Sua aplicação deve ter o endpoint GET `/user/:id`
  - 7 - Crie o modelo 'Category' em 'src/database/models/category.js' com as propriedades corretas
  - 8 - Sua aplicação deve ter o endpoint POST `/categories`
  - 9 - Sua aplicação deve ter o endpoint GET `/categories`
  - 10 - Crie o modelo 'BlogPost' em 'src/database/models/blogPost.js' com as propriedades e associações corretas
  - 11 - Crie o modelo 'PostCategory' em 'src/database/models/postCategory.js' com as propriedades e associações corretas
  - 12 - Sua aplicação deve ter o endpoint POST `/post`
  - 13 - Sua aplicação deve ter o endpoint GET `/post`
  - 14 - Sua aplicação deve ter o endpoint GET `/post/:id`
  - 15 - Sua aplicação deve ter o endpoint PUT `/post/:id`
  - 16 - Sua aplicação deve ter o endpoint DELETE `/post/:id`
  - 17 - Sua aplicação deve ter o endpoint DELETE `/user/me`
  - 18 - Sua aplicação deve ter o endpoint GET `/post/search?q=:searchTerm`
