
const http = require('http');
const fs = require('fs');
const port = 6008;
const ejs = require('ejs');

const requestHandler = (request, response) => {

    let params = {};
    params.copyright = '#BlondieCode © ' + (new Date()).getFullYear();

    params.history = [
        {
            type: 'system',
            link: '',
            text: 'Добро пожаловать в систему, новичок!'
        },
        {
            type: 'message',
            link: '#messages',
            text: 'Пользователь Кот007 оставил вам сообщение.'
        },
        {
            type: 'like',
            link: '#photo',
            text: 'Пользователю Кот007 нравится ваше фото.'
        },
        {
            type: 'subscribe',
            link: '#friends',
            text: 'Пользователь Кот007 добавил вас в друзья.'
        }
    ];

    if (request.url.indexOf('.') != -1) {

        response.end(fs.readFileSync(__dirname + request.url));

    } else {

        ejs.renderFile(__dirname + '/templates/template.ejs', params, (err, html) => {

            response.end(html);

        });
    }

};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {

    if (err) {
        return console.log(`Ошибка сервера ${err}`);
    }

    console.log(`Вишу на порту ${port}`);
});