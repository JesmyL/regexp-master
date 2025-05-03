## 🕹️Установка и использование

```sh
npm install regexp-master
```

### Что нужно для работы

#### 1. Зарегистрировать plugin

```ts
// vite.config.ts

import { regExpMasterVitePlugin } from 'regexp-master';

export default defineConfig(() => {
  return {
    plugins: [regExpMasterVitePlugin()],
  };
});
```

#### 2. Запустить проект

```sh
npm run dev
```

> ### <font color="red">Преобразования происходят только при запущеном проекте!</font>

#### 3. Наисать свой RegExp

```ts
// your-file.ts

import { makeNamedRegExp } from 'regexp-master';

const { regExp: myFavouriteRegExp, transform: transformMyFavouriteRegExp } = makeNamedRegExp(
  `/(1)\\s?text between\\s(?<groupName>named group)?/`,
);

// Будет преобразование в такое RegExp - так будет работать в браузерах в IOS
console.info(regExp); // /(1)\s?text between\s(named group)?( )?/
```

### Какая главная задача?

```ts
// Найдём подходящую строку:

const matches = '1text between named group'.match(myFavouriteRegExp); // ['1text between named group', '1', 'named group', undefined]

// Передадим результат в функцию transform
const result = transformMyFavouriteRegExp(matches);

console.info(result);
// {
//   $0: '1text between named group',
//   $1: '1',
//   groupName: 'named group',
//   $3: undefined,
// }

type Result = typeof result;
// Result is {
//   $0: `1${string | ''}text between${string}${'named group' | ''}${' ' | ''}`,
//   $1: '1',
//   groupName?: 'named group',
//   $3?: ' ',
// }
```

### Что мы получаем?

1. Удобное использование преобразованного объектв
2. Получаем ожидаемые типы по каждому полю
3. Наверняка знаем какое поле будет опциональным

> ### Не пугайтесь
>
> При каждом вашем изменении будут автоматически генерироваться файлы с вашими типами, которые вы всегда сможете просмотреть и проинспектировать

> ### <font color="red">Формат</font>
>
> Используйте только косые кавычки для написания StrRegExp
>
> ```ts
> const { regExp } = makeNamedRegExp(`/HI(?: World)/ig`);
> ```
>
> А так работать не будет
>
> ```ts
> const { regExp } = makeNamedRegExp('/HI(?: World)/ig');
> ```
