Installation
---

**Back**
1. Installer Node.js (version 16 minimum)
2. Installer MongoDb Community edition en local (https://www.mongodb.com/docs/manual/administration/install-community/)
3. Lancer le service MongoDb
4. Créer le fichier `.env` s'il n'existe pas avec le contenu suivant :
    JWT_KEY="AHJVHROIHGU1564"
    PORT=3000
5. Lancer depuis le dossier "Back" les commandes suivantes :
    - `npm install`
    - `npm run start`

**Front**
1. Installer Node.js (version 16 minimum)
2. Lancer depuis le dossier "Front" les commandes suivantes :
    - `npm install`
    - `npm run start`

Utilisation du site
---

Le front se lance sur : http://localhost:4200
Le back se lance sur : http://localhost:3000

La base de donnée ne comprend aucune donnée par défaut, l'inscription ne nécessite pas d'entrer un email réel (seul un email valide).