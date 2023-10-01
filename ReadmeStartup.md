# RunMe 2023
>nodemon server
Browser save a js file to refresh nodemon
or refresh with debug
http://127.0.0.1:8080/api/nunjucks/book


http://127.0.0.1:8080/api_view/tabulator
http://127.0.0.1:8080/api_view/test


Feb 2023



# Dec 2022
https://codecapsules.io/docs/tutorials/build-express-htmx/
modemon server
http://127.0.0.1:8080/api/nunjucks/book

## this is how to redirect
http://127.0.0.1:8080/meta/r
/default/index.js
/meta/r redirect to api/nunjucks/book

## to see deault startup see D:\devel\htmx-medium\HTMX1\app\plugins\socketio.js
  fastify.get('/', 
  async (req, reply) => {
    reply.redirect('/api/nunjucks/book')
  }) 
http://127.0.0.1:8080 

see D:\devel\htmx-medium\HTMX1\app\services\apihtmx\index.js
/apihtmx/book

D:\devel\htmx-medium\HTMX1\app\services\nunchucks\index.js
module.exports.autoPrefix = '/api/nunjucks';
fastify.get("/book",
    async (request, reply) => {
      books = await fastify.inject({
        method: 'get',
        url: `/api/todo/book`
      }).then((res) => res.json());
      books = books.data;
      console.log('books', books)
      reply.view('basebook.html', { title: 'Book Recommendations', hello: 'hello book world', books: books });
    });


    may 2013

    https://codepen.io/var-bin/pen/EWzEGb
    https://matthewjamestaylor.com/2-column-layouts#responsive-2-column-grid

    nvm list
    nvm install  lts 
    nvm use 18.18.0
