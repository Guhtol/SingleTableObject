# Single Table Object

> Simples plugin para construir sua tabela a partir de objetos JavaScript.

## Exemplo

```js
var table = new SingleTableObject({ name: 'Nome', planet: 'Planeta' });
var luke = { name: 'Luke', planet: 'Tatooine' };
var obiwan = { name: 'Obi-Wan', planet: 'Stewjon' };
var vader = { name: 'Anakin', planet: 'Tatooine' };

// Para inserir objetos na tabela
table
  .add(luke)
  .add(obiwan)
  .add(vader);

// ou através de array
table.add([luke, obiwan, vader]);

// Para inserir a tabela no documento HTML
table.appendTo('wrapper-id');

// ou
var wrapper = document.getElementById('wrapper-id');
table.appendTo(wrapper);
```
| Nome    | Planeta   |
| ------- | --------- |
| Luke    | Tatooine  |
| Obi-Wan | Stewjon   |
| Anakin  | Tatooine  |
