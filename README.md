![cover](.github/cover.png?style=flat)

## 💻 Projeto
Cópia da Disney Plus, plataforma de streamer da Disney. Site construído com o intuito educacional, onde utilizei do GraphCMS e GraphQL para o fornecimento de todos os dados exibidos na plataforma, sendo eles trailers dos filmes, imagens, informações, etc.

## ✨ Tecnologias

- [Next JS](https://nextjs.org/)
- [React JS](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphCMS](https://app.graphcms.com/)
- [GraphQL](https://graphql.org/)

## Executando o projeto

Caso queira executar o projeto por conta e ir criando sua própria cópia da Disney Plus a partir desse projeto, então será necessário primeiro você criar uma conta no site do [GraphCMS](https://app.graphcms.com/), caso ainda não tenha claro. E precisará criar a estrutura dos dados da mesma forma que criei e utilizei nesse projeto. Segue o [vídeo](https://www.youtube.com/watch?v=u1ovHJXkPBY&ab_channel=CodewithAniaKub%C3%B3w) ao qual utilizei como base para o projeto, nele mostra detalhadamente como fazer.

Após isso, precisará inserir variáveis ambiente em um arquivo chamado **.env** ou **.env.local**, como demonstrado abaixo:
```cl
GRAPH_CMS_TOKEN={your_token}
ENDPOINT={your_endpoint}
```

Utilize o **yarn** para instalar as dependências do projeto.
Em seguida, inicie o projeto.<br/>

```cl
yarn dev
```

**Observação**: Com todos os dados inseridos em sua conta GraphCMS, junto ao seu token e endpoint inseridos corretamente em um arquivo **.env** ou **.env.local**, o projeto deverá estar funcionando normalmente agora.


## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito por Rafael Quartaroli.

<br />
