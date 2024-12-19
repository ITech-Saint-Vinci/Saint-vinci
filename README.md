# Documentation dev

## Requirements

- Avoir Docker sur sa machine

### Installation des dépendances
Si vous êtes directement dans le projet `Saint-vinci`
- `cd frontend`
- `npm i`
- `cd ../server`
-  `npm i`

### Récupérer la base de données
Dans le cas où vous n'êtes pas dans le dossier `server` n'oubliez pas de `cd server` avant la commande suivante
- `npm run seed:students`

### Lancer le docker
Dans le cas où vous n'êtes pas dans le dossier `server` n'oubliez pas de `cd server` avant la commande suivante
- `docker compose up`

---

Ensuite avant de lancer le projet, créer une copie du `.env.example` en retirant le `.example`

Lancer la commande suivante dans le terminal `open ssl rand -base64 45` et copier le résultat dans `JWT_SECRET` dans le nouveau `.env`

Générer un hash sur [bcrypt](https://bcrypt-generator.com/) et ajouter le hash dans le `TEACHER_ORGINAL_PASSWORD` pour votre mot de passe pour se connecter plus tard


Vous pourrez maintenant démarrer le projet: 
- `cd frontend`
- `npm run dev`
- `cd ../server`
- `docker compose up -d` (Si ce n'est pas déjà fait)
- `npm run dev`



