# Projet Application Téléphones

## Prérequis

- Node.js
- npm
- MongoDB

## Installation

### Cloner le projet

```bash
git clone https://github.com/Maguethh/React-Phone-Shop-App.git
```

### Backend

1. Naviguer vers le dossier backend :

```bash
cd backend
```

2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` avec les variables suivantes :

```env
MONGODB_URL=mongodb+srv://_USERNAME_:_PASSWORD_@_CLUSTER-ADDRESS_/phoneApp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=_SECRET_
```

4. Lancer le serveur (port 4000 par défaut) :

```bash
nodemon
```

### Frontend

1. Naviguer vers le dossier frontend :

```bash
cd frontend
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer l'application (port 3000 par défaut) :

```bash
npm start
```

## Configuration MongoDB

Remplacer `_USERNAME_`, `_PASSWORD_`, et `_CLUSTER-ADDRESS_` par vos informations MongoDB.

## Captures d'écran

1. **Page d'accueil** : Affichage en temps réel de tous les téléphones de la base de données grâce à WebSocket.

![Page d'accueil](/images/Capture.PNG)

2. **Modale de login/signup** : Permet aux utilisateurs de se connecter ou de s'inscrire.

![Modale de login/signup](/images/Capture2.PNG)

3. **Modale pour éditer un téléphone** : Interface pour modifier les informations d'un téléphone.

![Édition d'un téléphone](/images/Capture3.PNG)

4. **Suppression d'un téléphone** : Option pour supprimer un téléphone de la base de données.

![Suppression d'un téléphone](/images/Capture4.PNG) 5. **Création d'un téléphone** : Formulaire pour ajouter un nouveau téléphone à la base de données.

![Création d'un téléphone](/images/Capture5.PNG)

## Note

Avec une deadline très serrée pour rendre ce projet (je disposais seulement de quelques heures), je n'ai pas eu le temps d'intégrer Redux. Donc, j'ai préféré me focaliser sur les technologies que je n'avais jamais utilisées auparavant, comme Material UI ou Socket.io, j'ai également remplacé les \_id génériques (1, 2, 3, 4) par les ObjectID aléatoires fournis par MongoDB.
