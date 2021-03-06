# Trackdéchets

> Gérer la traçabilité des déchets en toute sécurité

## Pré-requis

- Docker & docker-compose
- un reverse-proxy, comme [expliqué sur cet article](https://medium.com/@francoisromain/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0) de @francoisromain

## Mise en route rapide

1. renommer le ficher `.env.model` en `.env` et le compléter
2. ajouter les valeurs des variables d'environnement `API_HOST` et `UI_HOST` dans le fichier host

Par exemple:

```
127.0.0.1	trackdechets.local
127.0.0.1	api-trackdechets.local
```

> Pour rappel, le fichier host est dans `C:\Windows\System32\drivers\etc` sous windows, `/etc/hosts` ou `/private/etc/hosts` sous Linux et Mac

L'application sera accessible aux URL décrites dans le fichier `.env`.
3. lancer `docker-compose up` à la racine, ou en dev `docker-compose -f ./docker-compose.dev.yml up`
4. [Optionnel] restaurer un dump de la BDD

Il est possible de restaurer un dump de la base pour avoir des données avec lesquelles travailler en local. Pour avoir un dump adapté, s'adresser au développeur en charge du projet, il vous fournira un fichier `file.dump`.

Il faut alors se connecter à l'image postgre et y restaurer ce dump. Par exemple:

```bash
> docker cp /local/path/tofile.dump $(docker ps -aqf "name=postgres"):/path/to/file.dump
> docker exec -it $(docker ps -aqf "name=postgres") bash
> pg_restore /path/to/file.dump
```

5. lancer un déploiement Prisma

```bash
> docker exec -it $(docker ps -aqf "name=td-api") bash
> npx prisma deploy
```

6. C'est prêt ! Rendez-vous sur l'URL `UI_HOST` configurée dans votre fichier `.env` pour commencer à utiliser l'application.

7. [Linux/MacOS uniquement] Avant de pousser votre premier commit, il est recommandé d'installer un hook Github permettant de faire tourner TSLint sur le projet back. `~/.githooks/install-hooks.sh` se chargera de l'installation. Si vous avez besoin de forcer un push sans linter, il est toujours possible de faire `git push --no-verify`.

## Technologies

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [ApolloGraphql](https://www.apollographql.com/docs/react/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/client/client-typescript/)
- [Golang](https://golang.org/)
- [Airflow](https://airflow.apache.org/)
- [Docker](https://www.docker.com/)

## Organisation du projet

```bash
.
├── .circlecI      # Intégration continue
│
├── back           # Code de l'API exposée (Node.js)
│   ├── prisma     # Modèles de données et configuration de Prisma
│   └── src        # Code métier de l'API, organisé par thématique métier
│
├── front          # Frontend écrit en React
│
├── insee          # Service interne pour communiquer avec l'API de l'INSEE (Golang)
│
├── mail           # Service interne d'envoi de mails via Mailjet (Golang)
│
|── pdf            # Service interne de génération de PDF (JS, basé sur Puppeteer)
│
└── etl            # Service interne de consolidation des données s3ic

```

## Crédits

### Production

- [La Fabrique Numérique, Ministère de la transition écologique et solidaire](https://www.ecologique-solidaire.gouv.fr/inauguration-fabrique-numerique-lincubateur-des-ministeres-charges-lecologie-et-des-territoires)

### Équipe

- Emmanuel Flahaut, intrapreneur
- Claire Vigier, coach
- [Orion Charlier](https://github.com/riron), développeur
- [Benoît Guigal](https://github.com/benoitguigal), data scientist

## Licence

[AGPL v3 ou plus récent](https://spdx.org/licenses/AGPL-3.0-or-later.html)
